import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// SPA 경로 목록 (모든 클라이언트 라우트)
const SPA_ROUTES = [
  '/',
  '/animal-test',
  '/mbti-test',
  '/enneagram-test',
  '/palm-test',
  '/privacy-policy',
  '/terms-of-service',
  '/contact'
];

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  log("Setting up Vite development server", "vite");
  
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        log(`Vite error: ${msg}`, "vite-error");
        // 에러 발생 시 바로 종료하지 않고 로깅만 함
        // process.exit(1);
      },
      info: (msg, options) => {
        viteLogger.info(msg, options);
        log(`Vite info: ${msg}`, "vite-info");
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  log("Vite middleware initialized", "vite");
  
  // 디버깅을 위한 미들웨어 추가
  app.use((req, res, next) => {
    log(`Request received: ${req.method} ${req.originalUrl}`, "debug-router");
    log(`User-Agent: ${req.headers['user-agent']}`, "debug-router");
    log(`Referer: ${req.headers.referer || 'none'}`, "debug-router");
    next();
  });

  // attached_assets 폴더의 정적 파일 제공 (AI 모델 파일)
  // 중요: 이 미들웨어는 SPA 라우트 처리 미들웨어보다 먼저 실행되어야 함
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "client", "public", "attached_assets");
  log(`Setting up static file serving for AI models from: ${attachedAssetsPath}`, "static-assets");
  
  // 정적 파일 요청 로깅을 위한 미들웨어
  app.use('/attached_assets', (req, res, next) => {
    log(`Serving static file: ${req.path} from ${attachedAssetsPath}`, "static-file");
    next();
  });
  
  // 정적 파일 서빙 미들웨어
  app.use('/attached_assets', express.static(attachedAssetsPath, {
    setHeaders: (res, filePath) => {
      log(`Setting headers for: ${filePath}`, "static-file");
      // JSON 파일의 경우 적절한 Content-Type 설정
      if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      }
      // bin 파일의 경우 적절한 Content-Type 설정
      else if (filePath.endsWith('.bin')) {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
    }
  }));
  
  // 대체 경로로도 정적 파일 제공 (문제 해결을 위한 추가 경로)
  app.use('/client/public/attached_assets', express.static(attachedAssetsPath, {
    setHeaders: (res, filePath) => {
      log(`Setting headers for alternate path: ${filePath}`, "static-file");
      if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      }
      else if (filePath.endsWith('.bin')) {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
    }
  }));

  app.use(vite.middlewares);
  
  // SPA 라우트를 위한 미들웨어
  app.use(SPA_ROUTES, async (req, res, next) => {
    const url = req.originalUrl;
    
    // attached_assets 경로는 정적 파일로 처리
    if (url.includes('/attached_assets/')) {
      log(`Skipping SPA handling for static asset: ${url}`, "spa-router");
      return next();
    }
    
    log(`Handling SPA route: ${url}`, "spa-router");
    
    try {
      await handleSPARequest(url, req, res, next, vite);
    } catch (e) {
      const error = e as Error;
      log(`Error processing SPA request: ${error.message}`, "spa-error");
      vite.ssrFixStacktrace(error);
      next(e);
    }
  });
  
  // 모든 다른 요청을 처리하는 미들웨어
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // attached_assets 경로는 정적 파일로 처리
    if (url.includes('/attached_assets/')) {
      log(`Skipping catch-all handling for static asset: ${url}`, "vite-handler");
      return next();
    }
    
    log(`Handling request: ${url}`, "vite-handler");

    try {
      await handleSPARequest(url, req, res, next, vite);
    } catch (e) {
      const error = e as Error;
      log(`Error processing request: ${error.message}`, "vite-error");
      vite.ssrFixStacktrace(error);
      next(e);
    }
  });
}

// SPA 요청 처리 함수
async function handleSPARequest(url: string, req: any, res: any, next: any, vite: any) {
  const clientTemplate = path.resolve(
    import.meta.dirname,
    "..",
    "client",
    "index.html",
  );

  log(`Loading template from: ${clientTemplate}`, "vite-template");
  
  // always reload the index.html file from disk incase it changes
  let template = await fs.promises.readFile(clientTemplate, "utf-8");
  
  // 개발 환경에서 경로 수정
  template = template.replace(
    `src="/src/main.tsx"`,
    `src="/src/main.tsx?v=${nanoid()}"`,
  );
  
  // manifest.json 경로 수정
  template = template.replace(
    `href="/manifest.json"`,
    `href="/manifest.json?v=${nanoid()}"`,
  );
  
  // 기본 경로 접두사 제거 (이전에 PalmReading이 추가되었을 수 있음)
  template = template.replace(/href="\/PalmReading\//g, 'href="/');
  template = template.replace(/src="\/PalmReading\//g, 'src="/');
  
  // SPA 라우트 처리를 위한 스크립트 추가
  const spaScript = `
    <script>
      // SPA 라우팅을 위한 스크립트
      (function() {
        console.log("[SPA Router] Initializing SPA router");
        window.__SPA_ROUTES = ${JSON.stringify(SPA_ROUTES)};
        window.__INITIAL_PATH = "${url}";
      })();
    </script>
  `;
  
  // 스크립트를 </head> 태그 앞에 삽입
  template = template.replace('</head>', `${spaScript}</head>`);
  
  log(`Transforming index.html for URL: ${url}`, "vite-transform");
  const page = await vite.transformIndexHtml(url, template);
  
  log(`Sending transformed HTML response for: ${url}`, "vite-response");
  res.status(200).set({ "Content-Type": "text/html" }).end(page);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  log(`Setting up static file serving from: ${distPath}`, "static");

  if (!fs.existsSync(distPath)) {
    const errorMessage = `Could not find the build directory: ${distPath}, make sure to build the client first`;
    log(errorMessage, "static-error");
    throw new Error(errorMessage);
  }

  // attached_assets 폴더의 정적 파일 제공 (AI 모델 파일)
  // 중요: 이 미들웨어는 SPA 라우트 처리 미들웨어보다 먼저 실행되어야 함
  const attachedAssetsPath = path.resolve(import.meta.dirname, "..", "attached_assets");
  log(`Setting up static file serving for AI models from: ${attachedAssetsPath}`, "static-assets");
  
  // 정적 파일 요청 처리를 위한 미들웨어
  app.use('/attached_assets', express.static(attachedAssetsPath, {
    setHeaders: (res, filePath) => {
      // JSON 파일의 경우 적절한 Content-Type 설정
      if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      }
      // bin 파일의 경우 적절한 Content-Type 설정
      else if (filePath.endsWith('.bin')) {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
    }
  }));

  app.use(express.static(distPath));

  // SPA 라우트를 위한 미들웨어
  app.use(SPA_ROUTES, (req, res) => {
    // attached_assets 경로는 정적 파일로 처리
    if (req.originalUrl.includes('/attached_assets/')) {
      log(`Skipping SPA handling for static asset: ${req.originalUrl}`, "static-spa");
      return;
    }
    
    log(`Serving index.html for SPA route: ${req.originalUrl}`, "static-spa");
    res.sendFile(path.resolve(distPath, "index.html"));
  });

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    // attached_assets 경로는 정적 파일로 처리
    if (req.originalUrl.includes('/attached_assets/')) {
      log(`Skipping fallback for static asset: ${req.originalUrl}`, "static-fallback");
      return;
    }
    
    log(`Fallback to index.html for: ${req.originalUrl}`, "static-fallback");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
