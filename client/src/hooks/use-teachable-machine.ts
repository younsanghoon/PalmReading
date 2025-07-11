import { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

interface UseTeachableMachineProps {
  modelURL: string;
  metadataURL: string;
}

interface Prediction {
  className: string;
  probability: number;
}

export function useTeachableMachine({ modelURL, metadataURL }: UseTeachableMachineProps) {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모델 로드
  useEffect(() => {
    async function loadModel() {
      try {
        console.log('[TeachableMachine] Loading model from:', modelURL);
        console.log('[TeachableMachine] Loading metadata from:', metadataURL);
        setIsLoading(true);
        setError(null);
        
        // 파일 존재 확인
        console.log('[TeachableMachine] Checking if model files exist...');
        try {
          const modelResponse = await fetch(modelURL);
          console.log('[TeachableMachine] Model file response status:', modelResponse.status);
          
          if (!modelResponse.ok) {
            throw new Error(`Model file not found: ${modelURL} (Status: ${modelResponse.status})`);
          }
          
          // 모델 파일이 존재하면 메타데이터 파일 확인
          const metadataResponse = await fetch(metadataURL);
          console.log('[TeachableMachine] Metadata file response status:', metadataResponse.status);
          
          if (!metadataResponse.ok) {
            throw new Error(`Metadata file not found: ${metadataURL} (Status: ${metadataResponse.status})`);
          }
          
          console.log('[TeachableMachine] Files exist, loading model...');
          // 모델 로드 시도
          try {
            const loadedModel = await tmImage.load(modelURL, metadataURL);
            console.log('[TeachableMachine] Model loaded successfully:', loadedModel);
            
            setModel(loadedModel);
            setIsLoading(false);
          } catch (loadErr) {
            console.error('[TeachableMachine] Error during model loading:', loadErr);
            throw new Error(`모델 로드 중 오류: ${(loadErr as Error).message}`);
          }
        } catch (fetchErr) {
          console.error('[TeachableMachine] Error fetching model files:', fetchErr);
          throw new Error(`모델 파일 접근 오류: ${(fetchErr as Error).message}`);
        }
      } catch (err) {
        console.error('[TeachableMachine] Error loading model:', err);
        console.error('[TeachableMachine] Error details:', {
          message: (err as Error).message,
          stack: (err as Error).stack,
          modelURL,
          metadataURL
        });
        setError(`모델을 로드하는 중 오류가 발생했습니다: ${(err as Error).message}`);
        setIsLoading(false);
      }
    }

    loadModel();

    // 컴포넌트 언마운트 시 모델 정리
    return () => {
      if (model) {
        console.log('[TeachableMachine] Disposing model');
        model.dispose();
      }
    };
  }, [modelURL, metadataURL]);

  // 이미지로 예측
  const predict = async (imageElement: HTMLImageElement) => {
    if (!model) {
      console.error('[TeachableMachine] Model not loaded yet');
      setError('모델이 아직 로드되지 않았습니다.');
      return;
    }

    try {
      console.log('[TeachableMachine] Starting prediction');
      console.log('[TeachableMachine] Image element:', imageElement);
      console.log('[TeachableMachine] Image src:', imageElement.src);
      console.log('[TeachableMachine] Image dimensions:', imageElement.width, 'x', imageElement.height);
      setIsLoading(true);
      setError(null);
      
      // 예측 실행
      const prediction = await model.predict(imageElement);
      console.log('[TeachableMachine] Prediction complete:', prediction);
      
      // 결과 변환
      const results = prediction.map((p) => ({
        className: p.className,
        probability: p.probability,
      }));
      
      console.log('[TeachableMachine] Processed results:', results);
      setPredictions(results);
      setIsLoading(false);
      return results;
    } catch (err) {
      console.error('[TeachableMachine] Error during prediction:', err);
      console.error('[TeachableMachine] Prediction error details:', {
        message: (err as Error).message,
        stack: (err as Error).stack,
        imageElement: imageElement.src
      });
      setError(`예측 중 오류가 발생했습니다: ${(err as Error).message}`);
      setIsLoading(false);
      return [];
    }
  };

  // 동물상 예측 함수 - 기존 predict 함수를 사용하는 래퍼 함수
  const predictAnimal = async (imageElement: HTMLImageElement) => {
    console.log('[TeachableMachine] Starting animal face prediction');
    return await predict(imageElement);
  };

  // 파일로 예측
  const predictFromFile = async (file: File) => {
    console.log('[TeachableMachine] Predicting from file:', file.name);
    
    return new Promise<Prediction[]>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          console.log('[TeachableMachine] File loaded, creating image element');
          const img = new Image();
          img.src = e.target?.result as string;
          
          img.onload = async () => {
            try {
              console.log('[TeachableMachine] Image loaded, dimensions:', img.width, 'x', img.height);
              const results = await predict(img);
              if (results) {
                resolve(results);
              } else {
                reject(new Error('예측 결과가 없습니다.'));
              }
            } catch (err) {
              console.error('[TeachableMachine] Error in image prediction:', err);
              console.error('[TeachableMachine] Image prediction error details:', {
                message: (err as Error).message,
                stack: (err as Error).stack,
                fileName: file.name
              });
              reject(err);
            }
          };
          
          img.onerror = (err) => {
            console.error('[TeachableMachine] Error loading image:', err);
            console.error('[TeachableMachine] Image load error details:', {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
            });
            reject(new Error('이미지를 로드하는 중 오류가 발생했습니다.'));
          };
        } catch (err) {
          console.error('[TeachableMachine] Error processing file:', err);
          reject(err);
        }
      };
      
      reader.onerror = (err) => {
        console.error('[TeachableMachine] Error reading file:', err);
        reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  return {
    model,
    predictions,
    isLoading,
    error,
    predict,
    predictAnimal,
    predictFromFile,
  };
}
