import { useState, useCallback } from 'react';

interface UseImageUploadReturn {
  imageFile: File | null;
  imageUrl: string | null;
  isUploading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
  clearImage: () => void;
  createImageElement: () => Promise<HTMLImageElement | null>;
}

export function useImageUpload(): UseImageUploadReturn {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<void> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('선택한 파일이 이미지가 아닙니다.');
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('파일 크기는 10MB를 초과할 수 없습니다.');
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
          setImageFile(file);
        }
      };

      reader.onerror = () => {
        throw new Error('파일을 읽는 중 오류가 발생했습니다.');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImageUrl(null);
    setError(null);
  }, []);

  const createImageElement = useCallback(async (): Promise<HTMLImageElement | null> => {
    if (!imageUrl) return null;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  }, [imageUrl]);

  return {
    imageFile,
    imageUrl,
    isUploading,
    error,
    uploadImage,
    clearImage,
    createImageElement
  };
}
