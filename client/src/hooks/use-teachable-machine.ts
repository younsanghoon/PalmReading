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
      console.log('[useTeachableMachine] Calling predictAnimalFace');
      const predictions = await predictAnimalFace(imageElement);
      console.log('[useTeachableMachine] Received predictions:', predictions);
      return predictions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze animal face';
      console.error('[useTeachableMachine] Error in predictAnimal:', errorMessage);
      setError(errorMessage);
      
      // 오류 발생 시에도 fallback 결과를 반환하여 UI가 계속 작동하도록 함
      try {
        console.log('[useTeachableMachine] Attempting to generate fallback results');
        const imageHash = await generateSimpleHash(imageElement.src);
        const fallbackResults = generateFallbackPredictions(imageHash, 'animal');
        console.log('[useTeachableMachine] Generated fallback results:', fallbackResults);
        return fallbackResults;
      } catch (fallbackErr) {
        console.error('[useTeachableMachine] Failed to generate fallback results:', fallbackErr);
        return null;
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
