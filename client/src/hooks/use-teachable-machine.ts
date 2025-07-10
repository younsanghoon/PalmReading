import { useState, useCallback } from 'react';
import { predictAnimalFace, predictPalmReading, ModelPrediction } from '../lib/ai-models';

interface UseTeachableMachineReturn {
  isLoading: boolean;
  error: string | null;
  predictAnimal: (imageElement: HTMLImageElement) => Promise<ModelPrediction[] | null>;
  predictPalm: (imageElement: HTMLImageElement) => Promise<Record<string, ModelPrediction[]> | null>;
}

export function useTeachableMachine(): UseTeachableMachineReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictAnimal = useCallback(async (imageElement: HTMLImageElement): Promise<ModelPrediction[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const predictions = await predictAnimalFace(imageElement);
      return predictions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze animal face';
      setError(errorMessage);
      return null;
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

  return {
    isLoading,
    error,
    predictAnimal,
    predictPalm
  };
}
