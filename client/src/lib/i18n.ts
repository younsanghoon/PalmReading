import React, { useState, useEffect } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'id' | 'th' | 'vi';

export interface Translations {
  // Current language
  language: Language;
  
  // Navigation
  home: string;
  animalTest: string;
  mbtiTest: string;
  enneagramTest: string;
  palmTest: string;
  
  // Common
  start: string;
  next: string;
  previous: string;
  restart: string;
  share: string;
  result: string;
  loading: string;
  preparingQuestions: string;
  question: string;
  of: string;
  
  // Test descriptions
  animalTestDesc: string;
  mbtiTestDesc: string;
  enneagramTestDesc: string;
  palmTestDesc: string;
  
  // MBTI specific
  mbtiTitle: string;
  mbtiDescription: string;
  yourMBTI: string;
  
  // Enneagram specific
  enneagramTitle: string;
  selectGender: string;
  male: string;
  female: string;
  genderSelectDesc: string;
  
  // Animal test specific
  animalTestTitle: string;
  uploadImage: string;
  takePhoto: string;
  analyzing: string;
  animalResult: string;
  
  // Palm test specific
  palmTestTitle: string;
  palmAnalysis: string;
  
  // Results
  compatibility: string;
  bestMatch: string;
  goodMatch: string;
  traits: string;
  description: string;
  personalityAnalysis: string;
  
  // Error messages
  errorOccurred: string;
  imageRequired: string;
  analysisError: string;
}

export const translations: Record<Language, Translations> = {
  ko: {
    // Current language
    language: 'ko',
    
    // Navigation
    home: '홈',
    animalTest: '동물상 테스트',
    mbtiTest: 'MBTI 테스트',
    enneagramTest: '에겐-테토 테스트',
    palmTest: '손금 테스트',
    
    // Common
    start: '시작하기',
    next: '다음',
    previous: '이전',
    restart: '다시하기',
    share: '공유하기',
    result: '결과',
    loading: '로딩 중...',
    preparingQuestions: '질문을 준비하고 있습니다...',
    question: '질문',
    of: '/',
    
    // Test descriptions
    animalTestDesc: 'AI가 당신의 얼굴을 분석하여 닮은 동물을 찾아드립니다',
    mbtiTestDesc: '40문항으로 알아보는 나의 성격유형',
    enneagramTestDesc: '에겐형과 테토형 중 당신은?',
    palmTestDesc: '손금으로 보는 운세와 성격',
    
    // MBTI specific
    mbtiTitle: 'MBTI 성격 테스트',
    mbtiDescription: '정확한 MBTI 분석을 통해 당신의 성격을 알아보세요',
    yourMBTI: '당신의 MBTI는...',
    
    // Enneagram specific
    enneagramTitle: '에겐-테토 성격 테스트',
    selectGender: '성별을 선택해주세요',
    male: '남성',
    female: '여성',
    genderSelectDesc: '더 정확한 결과를 위해 성별을 선택해주세요',
    
    // Animal test specific
    animalTestTitle: '동물상 분석',
    uploadImage: '이미지 업로드',
    takePhoto: '사진 촬영',
    analyzing: '분석 중...',
    animalResult: '동물상 결과',
    
    // Palm test specific
    palmTestTitle: '손금 분석',
    palmAnalysis: '손금 분석 결과',
    
    // Results
    compatibility: '궁합',
    bestMatch: '최고 궁합',
    goodMatch: '좋은 궁합',
    traits: '특징',
    description: '설명',
    personalityAnalysis: '성격 분석',
    
    // Error messages
    errorOccurred: '오류가 발생했습니다',
    imageRequired: '이미지가 필요합니다',
    analysisError: '분석 중 오류가 발생했습니다'
  },
  
  en: {
    // Current language
    language: 'en',
    
    // Navigation
    home: 'Home',
    animalTest: 'Animal Face Test',
    mbtiTest: 'MBTI Test',
    enneagramTest: 'Enneagram Test',
    palmTest: 'Palm Reading',
    
    // Common
    start: 'Start',
    next: 'Next',
    previous: 'Previous',
    restart: 'Restart',
    share: 'Share',
    result: 'Result',
    loading: 'Loading...',
    preparingQuestions: 'Preparing questions...',
    question: 'Question',
    of: 'of',
    
    // Test descriptions
    animalTestDesc: 'AI analyzes your face to find which animal you resemble',
    mbtiTestDesc: 'Discover your personality type with 40 questions',
    enneagramTestDesc: 'Are you Egen type or Teto type?',
    palmTestDesc: 'Fortune and personality through palm reading',
    
    // MBTI specific
    mbtiTitle: 'MBTI Personality Test',
    mbtiDescription: 'Discover your personality through accurate MBTI analysis',
    yourMBTI: 'Your MBTI is...',
    
    // Enneagram specific
    enneagramTitle: 'Enneagram Personality Test',
    selectGender: 'Please select your gender',
    male: 'Male',
    female: 'Female',
    genderSelectDesc: 'Please select your gender for more accurate results',
    
    // Animal test specific
    animalTestTitle: 'Animal Face Analysis',
    uploadImage: 'Upload Image',
    takePhoto: 'Take Photo',
    analyzing: 'Analyzing...',
    animalResult: 'Animal Face Result',
    
    // Palm test specific
    palmTestTitle: 'Palm Reading',
    palmAnalysis: 'Palm Reading Results',
    
    // Results
    compatibility: 'Compatibility',
    bestMatch: 'Best Match',
    goodMatch: 'Good Match',
    traits: 'Traits',
    description: 'Description',
    personalityAnalysis: 'Personality Analysis',
    
    // Error messages
    errorOccurred: 'An error occurred',
    imageRequired: 'Image is required',
    analysisError: 'Error occurred during analysis'
  },
  
  ja: {
    // Current language
    language: 'ja',
    
    // Navigation
    home: 'ホーム',
    animalTest: '動物顔診断',
    mbtiTest: 'MBTI診断',
    enneagramTest: 'エニアグラム診断',
    palmTest: '手相占い',
    
    // Common
    start: 'スタート',
    next: '次へ',
    previous: '前へ',
    restart: 'やり直し',
    share: 'シェア',
    result: '結果',
    loading: '読み込み中...',
    preparingQuestions: '質問を準備しています...',
    question: '質問',
    of: '/',
    
    // Test descriptions
    animalTestDesc: 'AIがあなたの顔を分析して似ている動物を見つけます',
    mbtiTestDesc: '40問であなたの性格タイプを発見',
    enneagramTestDesc: 'あなたはどのタイプ？',
    palmTestDesc: '手相で見る運勢と性格',
    
    // MBTI specific
    mbtiTitle: 'MBTI性格診断',
    mbtiDescription: '正確なMBTI分析であなたの性格を知ろう',
    yourMBTI: 'あなたのMBTIは...',
    
    // Enneagram specific
    enneagramTitle: 'エニアグラム性格診断',
    selectGender: '性別を選択してください',
    male: '男性',
    female: '女性',
    genderSelectDesc: 'より正確な結果のために性別を選択してください',
    
    // Animal test specific
    animalTestTitle: '動物顔分析',
    uploadImage: '画像アップロード',
    takePhoto: '写真撮影',
    analyzing: '分析中...',
    animalResult: '動物顔結果',
    
    // Palm test specific
    palmTestTitle: '手相分析',
    palmAnalysis: '手相分析結果',
    
    // Results
    compatibility: '相性',
    bestMatch: '最高の相性',
    goodMatch: '良い相性',
    traits: '特徴',
    description: '説明',
    personalityAnalysis: '性格分析',
    
    // Error messages
    errorOccurred: 'エラーが発生しました',
    imageRequired: '画像が必要です',
    analysisError: '分析中にエラーが発生しました'
  },
  
  zh: {
    // Current language
    language: 'zh',
    
    // Navigation
    home: '首页',
    animalTest: '动物脸测试',
    mbtiTest: 'MBTI测试',
    enneagramTest: '九型人格测试',
    palmTest: '手相测试',
    
    // Common
    start: '开始',
    next: '下一个',
    previous: '上一个',
    restart: '重新开始',
    share: '分享',
    result: '结果',
    loading: '加载中...',
    preparingQuestions: '正在准备问题...',
    question: '问题',
    of: '/',
    
    // Test descriptions
    animalTestDesc: 'AI分析你的脸部特征，找出你最像的动物',
    mbtiTestDesc: '通过40个问题发现你的性格类型',
    enneagramTestDesc: '你是哪种性格类型？',
    palmTestDesc: '通过手相看运势和性格',
    
    // MBTI specific
    mbtiTitle: 'MBTI性格测试',
    mbtiDescription: '通过准确的MBTI分析了解你的性格',
    yourMBTI: '你的MBTI是...',
    
    // Enneagram specific
    enneagramTitle: '九型人格测试',
    selectGender: '请选择您的性别',
    male: '男性',
    female: '女性',
    genderSelectDesc: '请选择您的性别以获得更准确的结果',
    
    // Animal test specific
    animalTestTitle: '动物脸分析',
    uploadImage: '上传图片',
    takePhoto: '拍照',
    analyzing: '分析中...',
    animalResult: '动物脸结果',
    
    // Palm test specific
    palmTestTitle: '手相分析',
    palmAnalysis: '手相分析结果',
    
    // Results
    compatibility: '配对',
    bestMatch: '最佳配对',
    goodMatch: '良好配对',
    traits: '特征',
    description: '描述',
    personalityAnalysis: '性格分析',
    
    // Error messages
    errorOccurred: '发生错误',
    imageRequired: '需要图片',
    analysisError: '分析时发生错误'
  },
  
  id: {
    // Current language
    language: 'id',
    
    // Navigation
    home: 'Beranda',
    animalTest: 'Tes Wajah Hewan',
    mbtiTest: 'Tes MBTI',
    enneagramTest: 'Tes Enneagram',
    palmTest: 'Baca Telapak Tangan',
    
    // Common
    start: 'Mulai',
    next: 'Selanjutnya',
    previous: 'Sebelumnya',
    restart: 'Mulai Ulang',
    share: 'Bagikan',
    result: 'Hasil',
    loading: 'Memuat...',
    preparingQuestions: 'Menyiapkan pertanyaan...',
    question: 'Pertanyaan',
    of: 'dari',
    
    // Test descriptions
    animalTestDesc: 'AI menganalisis wajah Anda untuk menemukan hewan yang mirip',
    mbtiTestDesc: 'Temukan tipe kepribadian Anda dengan 40 pertanyaan',
    enneagramTestDesc: 'Anda termasuk tipe kepribadian yang mana?',
    palmTestDesc: 'Nasib dan kepribadian melalui garis tangan',
    
    // MBTI specific
    mbtiTitle: 'Tes Kepribadian MBTI',
    mbtiDescription: 'Temukan kepribadian Anda melalui analisis MBTI yang akurat',
    yourMBTI: 'MBTI Anda adalah...',
    
    // Enneagram specific
    enneagramTitle: 'Tes Kepribadian Enneagram',
    selectGender: 'Silakan pilih jenis kelamin Anda',
    male: 'Laki-laki',
    female: 'Perempuan',
    genderSelectDesc: 'Pilih jenis kelamin Anda untuk hasil yang lebih akurat',
    
    // Animal test specific
    animalTestTitle: 'Analisis Wajah Hewan',
    uploadImage: 'Unggah Gambar',
    takePhoto: 'Ambil Foto',
    analyzing: 'Menganalisis...',
    animalResult: 'Hasil Wajah Hewan',
    
    // Palm test specific
    palmTestTitle: 'Analisis Telapak Tangan',
    palmAnalysis: 'Hasil Analisis Telapak Tangan',
    
    // Results
    compatibility: 'Kompatibilitas',
    bestMatch: 'Pasangan Terbaik',
    goodMatch: 'Pasangan Baik',
    traits: 'Sifat',
    description: 'Deskripsi',
    personalityAnalysis: 'Analisis Kepribadian',
    
    // Error messages
    errorOccurred: 'Terjadi kesalahan',
    imageRequired: 'Gambar diperlukan',
    analysisError: 'Terjadi kesalahan saat analisis'
  },
  
  th: {
    // Current language
    language: 'th',
    
    // Navigation
    home: 'หน้าแรก',
    animalTest: 'ทดสอบหน้าสัตว์',
    mbtiTest: 'ทดสอบ MBTI',
    enneagramTest: 'ทดสอบ Enneagram',
    palmTest: 'ดูลายมือ',
    
    // Common
    start: 'เริ่ม',
    next: 'ถัดไป',
    previous: 'ก่อนหน้า',
    restart: 'เริ่มใหม่',
    share: 'แชร์',
    result: 'ผลลัพธ์',
    loading: 'กำลังโหลด...',
    preparingQuestions: 'กำลังเตรียมคำถาม...',
    question: 'คำถาม',
    of: 'จาก',
    
    // Test descriptions
    animalTestDesc: 'AI วิเคราะห์ใบหน้าของคุณเพื่อหาสัตว์ที่คล้ายกัน',
    mbtiTestDesc: 'ค้นพบประเภทบุคลิกภาพของคุณด้วยคำถาม 40 ข้อ',
    enneagramTestDesc: 'คุณเป็นประเภทบุคลิกภาพแบบไหน?',
    palmTestDesc: 'โชคชะตาและบุคลิกภาพผ่านลายมือ',
    
    // MBTI specific
    mbtiTitle: 'การทดสอบบุคลิกภาพ MBTI',
    mbtiDescription: 'ค้นพบบุคลิกภาพของคุณผ่านการวิเคราะห์ MBTI ที่แม่นยำ',
    yourMBTI: 'MBTI ของคุณคือ...',
    
    // Enneagram specific
    enneagramTitle: 'การทดสอบบุคลิกภาพ Enneagram',
    selectGender: 'กรุณาเลือกเพศของคุณ',
    male: 'ชาย',
    female: 'หญิง',
    genderSelectDesc: 'กรุณาเลือกเพศของคุณเพื่อผลลัพธ์ที่แม่นยำยิ่งขึ้น',
    
    // Animal test specific
    animalTestTitle: 'การวิเคราะห์หน้าสัตว์',
    uploadImage: 'อัปโหลดรูปภาพ',
    takePhoto: 'ถ่ายภาพ',
    analyzing: 'กำลังวิเคราะห์...',
    animalResult: 'ผลลัพธ์หน้าสัตว์',
    
    // Palm test specific
    palmTestTitle: 'การวิเคราะห์ลายมือ',
    palmAnalysis: 'ผลการวิเคราะห์ลายมือ',
    
    // Results
    compatibility: 'ความเข้ากัน',
    bestMatch: 'คู่ที่ดีที่สุด',
    goodMatch: 'คู่ที่ดี',
    traits: 'ลักษณะ',
    description: 'คำอธิบาย',
    personalityAnalysis: 'การวิเคราะห์บุคลิกภาพ',
    
    // Error messages
    errorOccurred: 'เกิดข้อผิดพลาด',
    imageRequired: 'จำเป็นต้องมีรูปภาพ',
    analysisError: 'เกิดข้อผิดพลาดขณะวิเคราะห์'
  },
  
  vi: {
    // Current language
    language: 'vi',
    
    // Navigation
    home: 'Trang chủ',
    animalTest: 'Test Mặt Động Vật',
    mbtiTest: 'Test MBTI',
    enneagramTest: 'Test Enneagram',
    palmTest: 'Xem Tướng Tay',
    
    // Common
    start: 'Bắt đầu',
    next: 'Tiếp theo',
    previous: 'Trước đó',
    restart: 'Bắt đầu lại',
    share: 'Chia sẻ',
    result: 'Kết quả',
    loading: 'Đang tải...',
    preparingQuestions: 'Đang chuẩn bị câu hỏi...',
    question: 'Câu hỏi',
    of: 'của',
    
    // Test descriptions
    animalTestDesc: 'AI phân tích khuôn mặt của bạn để tìm động vật giống nhất',
    mbtiTestDesc: 'Khám phá kiểu tính cách của bạn với 40 câu hỏi',
    enneagramTestDesc: 'Bạn thuộc kiểu tính cách nào?',
    palmTestDesc: 'Vận mệnh và tính cách qua tướng tay',
    
    // MBTI specific
    mbtiTitle: 'Test Tính Cách MBTI',
    mbtiDescription: 'Khám phá tính cách của bạn qua phân tích MBTI chính xác',
    yourMBTI: 'MBTI của bạn là...',
    
    // Enneagram specific
    enneagramTitle: 'Test Tính Cách Enneagram',
    selectGender: 'Vui lòng chọn giới tính của bạn',
    male: 'Nam',
    female: 'Nữ',
    genderSelectDesc: 'Vui lòng chọn giới tính để có kết quả chính xác hơn',
    
    // Animal test specific
    animalTestTitle: 'Phân Tích Mặt Động Vật',
    uploadImage: 'Tải Ảnh Lên',
    takePhoto: 'Chụp Ảnh',
    analyzing: 'Đang phân tích...',
    animalResult: 'Kết Quả Mặt Động Vật',
    
    // Palm test specific
    palmTestTitle: 'Phân Tích Tướng Tay',
    palmAnalysis: 'Kết Quả Phân Tích Tướng Tay',
    
    // Results
    compatibility: 'Tương thích',
    bestMatch: 'Cặp Đôi Tốt Nhất',
    goodMatch: 'Cặp Đôi Tốt',
    traits: 'Đặc điểm',
    description: 'Mô tả',
    personalityAnalysis: 'Phân Tích Tính Cách',
    
    // Error messages
    errorOccurred: 'Đã xảy ra lỗi',
    imageRequired: 'Cần có hình ảnh',
    analysisError: 'Lỗi xảy ra trong quá trình phân tích'
  }
};

// Language context and hook
export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved && Object.keys(translations).includes(saved)) {
        return saved as Language;
      }
      
      // Auto-detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('ja')) return 'ja';
      if (browserLang.startsWith('zh')) return 'zh';
      if (browserLang.startsWith('id')) return 'id';
      if (browserLang.startsWith('th')) return 'th';
      if (browserLang.startsWith('vi')) return 'vi';
    }
    return 'ko'; // Default to Korean
  });

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return { language, changeLanguage, t };
}

// Language selector component data
export const languageOptions = [
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'id' as Language, name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th' as Language, name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi' as Language, name: 'Tiếng Việt', flag: '🇻🇳' }
];