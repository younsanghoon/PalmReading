import React, { useState, useCallback } from 'react';
import { 
  predictAnimalFace, 
  predictPalmReading, 
  ModelPrediction,
  generateSimpleHash,
  generateFallbackPredictions
} from '../lib/ai-models';

interface UseTeachableMachineProps {
  modelURL?: string;
  metadataURL?: string;
}

interface UseTeachableMachineReturn {
  isLoading: boolean;
  error: string | null;
  model: boolean;
  predict: (imageElement: HTMLImageElement) => Promise<any>;
  predictAnimal: (imageElement: HTMLImageElement) => Promise<ModelPrediction[] | null>;
  predictPalm: (imageElement: HTMLImageElement) => Promise<Record<string, ModelPrediction[]> | null>;
}

export function useTeachableMachine({ modelURL, metadataURL }: UseTeachableMachineProps = {}): UseTeachableMachineReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState(false);

  // 일반 예측 함수 (범용)
  const predict = useCallback(async (imageElement: HTMLImageElement): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      // 모델 URL에 따라 적절한 예측 함수 호출
      if (modelURL?.includes('animal')) {
        return await predictAnimalFace(imageElement);
      } else {
        return await predictPalmReading(imageElement);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [modelURL]);

  const predictAnimal = useCallback(async (imageElement: HTMLImageElement): Promise<ModelPrediction[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[useTeachableMachine] Calling predictAnimalFace with image:', imageElement.src.substring(0, 50) + '...');
      
      // 이미지 요소 유효성 검사
      if (!imageElement || !imageElement.complete || !imageElement.naturalHeight) {
        console.error('[useTeachableMachine] Invalid image element:', imageElement);
        throw new Error('Invalid image element');
      }
      
      const predictions = await predictAnimalFace(imageElement);
      console.log('[useTeachableMachine] Received predictions:', JSON.stringify(predictions));
      
      // 예측 결과 유효성 검사
      if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
        console.error('[useTeachableMachine] Invalid predictions received:', predictions);
        throw new Error('Invalid predictions received');
      }
      
      // 클래스명 유효성 검사
      const validClassNames = ['dog', 'cat', 'rabbit', 'dinosaur', 'bear', 'deer', 'fox'];
      const hasValidClass = predictions.some(p => 
        validClassNames.includes(p.className) && p.probability > 0
      );
      
      if (!hasValidClass) {
        console.warn('[useTeachableMachine] No valid animal class found in predictions');
        console.log('[useTeachableMachine] Valid class names:', validClassNames);
        console.log('[useTeachableMachine] Received class names:', predictions.map(p => p.className));
        
        // 하드코딩된 결과 제공
        return [
          { className: 'dog', probability: 0.3 },
          { className: 'cat', probability: 0.25 },
          { className: 'bear', probability: 0.2 },
          { className: 'rabbit', probability: 0.15 },
          { className: 'fox', probability: 0.1 }
        ];
      }
      
      return predictions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze animal face';
      console.error('[useTeachableMachine] Error in predictAnimal:', errorMessage);
      setError(errorMessage);
      
      // 오류 발생 시에도 fallback 결과를 반환하여 UI가 계속 작동하도록 함
      try {
        console.log('[useTeachableMachine] Attempting to generate fallback results');
        const imageHash = await generateSimpleHash(imageElement.src);
        console.log('[useTeachableMachine] Generated image hash:', imageHash);
        
        const fallbackResults = generateFallbackPredictions(imageHash, 'animal');
        console.log('[useTeachableMachine] Generated fallback results:', JSON.stringify(fallbackResults));
        
        // 결과 유효성 검사
        if (!fallbackResults || fallbackResults.length === 0) {
          throw new Error('Invalid fallback results');
        }
        
        return fallbackResults;
      } catch (fallbackErr) {
        console.error('[useTeachableMachine] Failed to generate fallback results:', fallbackErr);
        
        // 최후의 수단으로 하드코딩된 결과 반환
        console.warn('[useTeachableMachine] Returning hardcoded fallback results');
        return [
          { className: 'dog', probability: 0.3 },
          { className: 'cat', probability: 0.25 },
          { className: 'bear', probability: 0.2 },
          { className: 'rabbit', probability: 0.15 },
          { className: 'fox', probability: 0.1 }
        ];
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const predictPalm = useCallback(async (imageElement: HTMLImageElement): Promise<Record<string, ModelPrediction[]> | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const predictions = await predictPalmReading(imageElement);
      return predictions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze palm reading';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 모델 로드 상태 설정
  React.useEffect(() => {
    if (modelURL && metadataURL) {
      setModel(true);
    }
  }, [modelURL, metadataURL]);

  return {
    isLoading,
    error,
    model,
    predict,
    predictAnimal,
    predictPalm
  };
}
