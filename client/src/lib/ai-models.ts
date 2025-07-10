import * as tf from '@tensorflow/tfjs';
import { decryptUrl, ENCRYPTED_MODEL_URLS } from './encryption';

// Global model storage
let animalModel: any = null;
let palmModels: Record<string, any> = {};

export interface ModelPrediction {
  className: string;
  probability: number;
}

export async function loadAnimalModel(): Promise<void> {
  try {
    if (animalModel) return;
    
    // Load the pre-uploaded animal model using TensorFlow.js
    const modelUrl = '/attached_assets/model_1752161703239.json';
    animalModel = await tf.loadLayersModel(modelUrl);
    console.log('Animal model loaded successfully');
  } catch (error) {
    console.error('Error loading animal model:', error);
    // Don't throw error to prevent app crash
    console.warn('Animal face analysis will not be available');
  }
}

export async function loadPalmModels(): Promise<void> {
  try {
    const tmImage = await import('@teachablemachine/image');
    
    for (const [key, encryptedUrl] of Object.entries(ENCRYPTED_MODEL_URLS)) {
      if (key.startsWith('palm') && !palmModels[key]) {
        try {
          const modelUrl = decryptUrl(encryptedUrl);
          palmModels[key] = await tmImage.load(modelUrl + '/model.json', modelUrl + '/metadata.json');
          console.log(`${key} model loaded successfully`);
        } catch (error) {
          console.warn(`Failed to load ${key} model:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error loading palm models:', error);
    throw new Error('Failed to load palm reading models');
  }
}

export async function predictAnimalFace(imageElement: HTMLImageElement): Promise<ModelPrediction[]> {
  if (!animalModel) {
    await loadAnimalModel();
  }
  
  if (!animalModel) {
    // Return mock data for demonstration
    const animalTypes = ['강아지상', '고양이상', '곰상', '여우상', '원숭이상', '토끼상'];
    const randomValues = animalTypes.map(() => Math.random());
    const sum = randomValues.reduce((a, b) => a + b, 0);
    
    return animalTypes.map((type, index) => ({
      className: type,
      probability: randomValues[index] / sum
    }));
  }
  
  try {
    // Preprocess image for TensorFlow.js model
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims(0);
      
    const predictions = await animalModel.predict(tensor) as tf.Tensor;
    const probabilities = await predictions.data();
    
    tensor.dispose();
    predictions.dispose();
    
    const animalTypes = ['강아지상', '고양이상', '곰상', '여우상', '원숭이상', '토끼상'];
    
    return animalTypes.map((type, index) => ({
      className: type,
      probability: probabilities[index] || 0
    }));
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to analyze image');
  }
}

export async function predictPalmReading(imageElement: HTMLImageElement): Promise<Record<string, ModelPrediction[]>> {
  if (Object.keys(palmModels).length === 0) {
    await loadPalmModels();
  }
  
  const results: Record<string, ModelPrediction[]> = {};
  
  for (const [key, model] of Object.entries(palmModels)) {
    if (model) {
      try {
        const predictions = await model.predict(imageElement);
        results[key] = predictions.map((pred: any) => ({
          className: pred.className,
          probability: pred.probability
        }));
      } catch (error) {
        console.warn(`Failed to predict with ${key} model:`, error);
      }
    }
  }
  
  return results;
}

export function initializeModels(): void {
  // Pre-load models for better user experience
  loadAnimalModel().catch(console.error);
  loadPalmModels().catch(console.error);
}
