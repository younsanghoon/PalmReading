import React, { useState, useEffect } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'id' | 'th' | 'vi';

export interface Translations {
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
  
  // Camera related
  capturedPhoto: string;
  startCamera: string;
  switchCamera: string;
  loadingAIModel: string;
  
  // Palm test specific
  palmTestTitle: string;
  palmAnalysis: string;
  uploadPalmImage: string;
  palmImageInstructions: string;
  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  abilityLine: string;
  overallAnalysis: string;
  
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
  
  // Home page
  homeDescription: string;
  footerTitle: string;
  footerDescription: string;
  copyright: string;
  safeTestEnvironment: string;
  noDataCollection: string;
  browserAnalysis: string;
  allDevices: string;
  instantResults: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
}

export const translations: Record<Language, Translations> = {
  ko: {
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
    
    // Camera related
    capturedPhoto: '사진 촬영 완료',
    startCamera: '카메라 시작',
    switchCamera: '카메라 전환',
    loadingAIModel: 'AI 모델 로딩 중...',
    
    // Palm test specific
    palmTestTitle: '손금 분석',
    palmAnalysis: '손금 분석 결과',
    uploadPalmImage: '손바닥 사진을 업로드하세요',
    palmImageInstructions: '손바닥을 편 상태로 선명하게 촬영해 주세요. 손금이 잘 보이도록 조명을 밝게 해주세요.',
    lifeLine: '생명선',
    heartLine: '감정선',
    headLine: '지능선',
    fateLine: '운명선',
    abilityLine: '능력선',
    overallAnalysis: '전체 분석',
    
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
    analysisError: '분석 중 오류가 발생했습니다',
    
    // Home page
    homeDescription: 'AI 기술로 알아보는 여러가지 나의 모습\n성격, 운세, 외모까지 다양한 테스트를 경험해보세요',
    footerTitle: 'AI 성격 테스트',
    footerDescription: '인공지능 기반 다양한 성격 및 운세 분석 서비스',
    copyright: '© 2024 AI 테스트. 모든 권리 보유.',
    safeTestEnvironment: '안전한 테스트 환경',
    noDataCollection: '개인정보 수집 및 저장 안 함',
    browserAnalysis: '모든 분석은 브라우저에서 실행',
    allDevices: '모든 기기에서 이용 가능',
    instantResults: '즉시 결과 확인',
    privacyPolicy: '개인정보 보호정책',
    termsOfService: '이용약관',
    contact: '문의하기'
  },
  
  en: {
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
    
    // Camera related
    capturedPhoto: 'Photo captured',
    startCamera: 'Start Camera',
    switchCamera: 'Switch Camera',
    loadingAIModel: 'Loading AI model...',
    
    // Palm test specific
    palmTestTitle: 'Palm Reading',
    palmAnalysis: 'Palm Reading Results',
    uploadPalmImage: 'Upload your palm image',
    palmImageInstructions: 'Take a clear photo with your palm open. Make sure the lighting is good so your palm lines are visible.',
    lifeLine: 'Life Line',
    heartLine: 'Heart Line',
    headLine: 'Head Line',
    fateLine: 'Fate Line',
    abilityLine: 'Ability Line',
    overallAnalysis: 'Overall Analysis',
    
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
    analysisError: 'Error during analysis',
    
    // Home page
    homeDescription: 'Discover different aspects of yourself with AI technology\nExperience various tests for personality, fortune, and appearance',
    footerTitle: 'AI Personality Tests',
    footerDescription: 'AI-based personality and fortune analysis services',
    copyright: '© 2024 AI Tests. All rights reserved.',
    safeTestEnvironment: 'Safe Testing Environment',
    noDataCollection: 'No personal data collection or storage',
    browserAnalysis: 'All analysis runs in your browser',
    allDevices: 'Available on all devices',
    instantResults: 'Instant results',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contact: 'Contact Us'
  },
  
  ja: {
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
    
    // Camera related
    capturedPhoto: '写真撮影完了',
    startCamera: 'カメラ開始',
    switchCamera: 'カメラ切り替え',
    loadingAIModel: 'AIモデル読み込み中...',
    
    // Palm test specific
    palmTestTitle: '手相分析',
    palmAnalysis: '手相分析結果',
    uploadPalmImage: '手のひらの写真をアップロードしてください',
    palmImageInstructions: '手のひらを開いた状態で鮮明な写真を撮ってください。照明を明るくして手相がよく見えるようにしてください。',
    lifeLine: '生命線',
    heartLine: '感情線',
    headLine: '知能線',
    fateLine: '運命線',
    abilityLine: '才能線',
    overallAnalysis: '総合分析',
    
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
    analysisError: '分析中にエラーが発生しました',
    
    // Home page
    homeDescription: 'AIテクノロジーで自分の様々な側面を発見\n性格、運勢、外見まで多様なテストを体験しよう',
    footerTitle: 'AI性格テスト',
    footerDescription: 'AI技術を活用した性格・運勢分析サービス',
    copyright: '© 2024 AIテスト. 全ての権利を保有。',
    safeTestEnvironment: '安全なテスト環境',
    noDataCollection: '個人情報の収集・保存なし',
    browserAnalysis: '全ての分析はブラウザ内で実行',
    allDevices: 'あらゆるデバイスで利用可能',
    instantResults: '即時結果確認',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    contact: 'お問い合わせ'
  },
  
  zh: {
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
    
    // Camera related
    capturedPhoto: '照片拍摄完成',
    startCamera: '开始相机',
    switchCamera: '切换相机',
    loadingAIModel: '加载AI模型中...',
    
    // Palm test specific
    palmTestTitle: '手相分析',
    palmAnalysis: '手相分析结果',
    uploadPalmImage: '上传您的手掌图片',
    palmImageInstructions: '请拍摄清晰的手掌照片，确保光线充足，使手相线条清晰可见。',
    lifeLine: '生命线',
    heartLine: '感情线',
    headLine: '智慧线',
    fateLine: '命运线',
    abilityLine: '能力线',
    overallAnalysis: '整体分析',
    
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
    analysisError: '分析时发生错误',
    
    // Home page
    homeDescription: '通过AI技术探索自我的多个方面\n体验各种性格、命运和外表测试',
    footerTitle: 'AI性格测试',
    footerDescription: '基于人工智能的性格和命运分析服务',
    copyright: '© 2024 AI测试. 保留所有权利。',
    safeTestEnvironment: '安全的测试环境',
    noDataCollection: '不收集和存储个人信息',
    browserAnalysis: '所有分析在浏览器中进行',
    allDevices: '适用于所有设备',
    instantResults: '即时查看结果',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    contact: '联系我们'
  },
  
  id: {
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
    
    // Camera related
    capturedPhoto: 'Foto diambil',
    startCamera: 'Mulai Kamera',
    switchCamera: 'Tukar Kamera',
    loadingAIModel: 'Memuat Model AI...',
    
    // Palm test specific
    palmTestTitle: 'Analisis Telapak Tangan',
    palmAnalysis: 'Hasil Analisis Telapak Tangan',
    uploadPalmImage: 'Unggah gambar telapak tangan Anda',
    palmImageInstructions: 'Ambil foto yang jelas dengan telapak tangan terbuka. Pastikan pencahayaan baik agar garis telapak tangan Anda terlihat.',
    lifeLine: 'Garis Kehidupan',
    heartLine: 'Garis Hati',
    headLine: 'Garis Kepala',
    fateLine: 'Garis Takdir',
    abilityLine: 'Garis Kemampuan',
    overallAnalysis: 'Analisis Keseluruhan',
    
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
    analysisError: 'Terjadi kesalahan saat analisis',
    
    // Home page
    homeDescription: 'Temukan berbagai aspek diri Anda dengan teknologi AI\nAlami berbagai tes untuk kepribadian, nasib, dan penampilan',
    footerTitle: 'Tes Kepribadian AI',
    footerDescription: 'Layanan analisis kepribadian dan nasib berbasis kecerdasan buatan',
    copyright: '© 2024 Tes AI. Semua hak dilindungi.',
    safeTestEnvironment: 'Lingkungan Pengujian yang Aman',
    noDataCollection: 'Tidak ada pengumpulan atau penyimpanan data pribadi',
    browserAnalysis: 'Semua analisis berjalan di browser Anda',
    allDevices: 'Tersedia di semua perangkat',
    instantResults: 'Hasil instan',
    privacyPolicy: 'Kebijakan Privasi',
    termsOfService: 'Ketentuan Layanan',
    contact: 'Hubungi Kami'
  },
  
  th: {
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
    
    // Camera related
    capturedPhoto: 'ภาพถ่ายเสร็จสมบูรณ์',
    startCamera: 'เริ่มคลิปคาเมร์',
    switchCamera: 'สลับคลิปคาเมร์',
    loadingAIModel: 'กำลังโหลดโมเดล AI...',
    
    // Palm test specific
    palmTestTitle: 'การวิเคราะห์ลายมือ',
    palmAnalysis: 'ผลการวิเคราะห์ลายมือ',
    uploadPalmImage: 'อัปโหลดภาพฝ่ามือของคุณ',
    palmImageInstructions: 'ถ่ายภาพที่ชัดเจนโดยเปิดฝ่ามือ ตรวจสอบให้แน่ใจว่าแสงสว่างเพียงพอเพื่อให้เห็นเส้นลายมือชัดเจน',
    lifeLine: 'เส้นชีวิต',
    heartLine: 'เส้นความรัก',
    headLine: 'เส้นสติปัญญา',
    fateLine: 'เส้นโชคชะตา',
    abilityLine: 'เส้นความสามารถ',
    overallAnalysis: 'การวิเคราะห์โดยรวม',
    
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
    analysisError: 'เกิดข้อผิดพลาดขณะวิเคราะห์',
    
    // Home page
    homeDescription: 'ค้นพบด้านต่างๆ ของตัวคุณด้วยเทคโนโลยี AI\nสัมผัสการทดสอบหลากหลายสำหรับบุคลิกภาพ โชคชะตา และรูปลักษณ์',
    footerTitle: 'การทดสอบบุคลิกภาพด้วย AI',
    footerDescription: 'บริการวิเคราะห์บุคลิกภาพและโชคชะตาด้วยปัญญาประดิษฐ์',
    copyright: '© 2024 การทดสอบ AI สงวนลิขสิทธิ์ทั้งหมด',
    safeTestEnvironment: 'สภาพแวดล้อมการทดสอบที่ปลอดภัย',
    noDataCollection: 'ไม่มีการเก็บหรือจัดเก็บข้อมูลส่วนบุคคล',
    browserAnalysis: 'การวิเคราะห์ทั้งหมดทำงานในเบราว์เซอร์ของคุณ',
    allDevices: 'ใช้งานได้บนทุกอุปกรณ์',
    instantResults: 'ผลลัพธ์ทันที',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',
    termsOfService: 'เงื่อนไขการให้บริการ',
    contact: 'ติดต่อเรา'
  },
  
  vi: {
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
    
    // Camera related
    capturedPhoto: 'Ảnh được chụp',
    startCamera: 'Bắt đầu Camera',
    switchCamera: 'Chuyển đổi Camera',
    loadingAIModel: 'Đang tải mô hình AI...',
    
    // Palm test specific
    palmTestTitle: 'Phân Tích Tướng Tay',
    palmAnalysis: 'Kết Quả Phân Tích Tướng Tay',
    uploadPalmImage: 'Tải lên hình ảnh lòng bàn tay của bạn',
    palmImageInstructions: 'Chụp ảnh rõ ràng với lòng bàn tay mở. Đảm bảo ánh sáng tốt để các đường chỉ tay của bạn hiện rõ.',
    lifeLine: 'Đường Sinh Mệnh',
    heartLine: 'Đường Tình Cảm',
    headLine: 'Đường Trí Tuệ',
    fateLine: 'Đường Số Phận',
    abilityLine: 'Đường Năng Lực',
    overallAnalysis: 'Phân Tích Tổng Thể',
    
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
    analysisError: 'Lỗi xảy ra trong quá trình phân tích',
    
    // Home page
    homeDescription: 'Khám phá nhiều khía cạnh của bản thân với công nghệ AI\nTrải nghiệm các bài kiểm tra đa dạng về tính cách, vận mệnh và ngoại hình',
    footerTitle: 'Kiểm Tra Tính Cách AI',
    footerDescription: 'Dịch vụ phân tích tính cách và vận mệnh dựa trên trí tuệ nhân tạo',
    copyright: '© 2024 Kiểm Tra AI. Đã đăng ký bản quyền.',
    safeTestEnvironment: 'Môi Trường Kiểm Tra An Toàn',
    noDataCollection: 'Không thu thập hoặc lưu trữ dữ liệu cá nhân',
    browserAnalysis: 'Tất cả phân tích được thực hiện trong trình duyệt của bạn',
    allDevices: 'Khả dụng trên mọi thiết bị',
    instantResults: 'Kết quả tức thì',
    privacyPolicy: 'Chính Sách Bảo Mật',
    termsOfService: 'Điều Khoản Dịch Vụ',
    contact: 'Liên Hệ'
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
      
      // 언어 변경 이벤트를 전파하여 모든 컴포넌트에 알림
      console.log('[i18n] Dispatching language change event:', newLanguage);
      const event = new CustomEvent('languageChanged', { 
        detail: { language: newLanguage },
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(event);
      
      // 모달이나 팝업에도 변경 사항이 적용되도록 페이지 새로고침
      console.log('[i18n] Reloading page to apply language change');
      window.location.reload();
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