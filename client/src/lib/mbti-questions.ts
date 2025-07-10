import { Question } from '../types/personality';

export const MBTI_QUESTIONS: Question[] = [
  // E vs I 질문들 (40개)
  {
    id: '1',
    question: '새로운 사람들과 만날 때 나는',
    options: [
      { text: '적극적으로 대화를 시작한다', value: 'E' },
      { text: '상대방이 먼저 말 걸기를 기다린다', value: 'I' }
    ]
  },
  {
    id: '2',
    question: '파티에서 나는',
    options: [
      { text: '여러 사람과 대화하며 에너지를 얻는다', value: 'E' },
      { text: '소수의 친한 사람과 깊은 대화를 나눈다', value: 'I' }
    ]
  },
  {
    id: '3',
    question: '힘든 일이 있을 때 나는',
    options: [
      { text: '친구들에게 이야기하며 해결책을 찾는다', value: 'E' },
      { text: '혼자 시간을 가지며 생각을 정리한다', value: 'I' }
    ]
  },
  {
    id: '4',
    question: '회의에서 나는',
    options: [
      { text: '적극적으로 의견을 제시한다', value: 'E' },
      { text: '충분히 생각한 후 신중히 발언한다', value: 'I' }
    ]
  },
  {
    id: '5',
    question: '주말에 나는',
    options: [
      { text: '친구들과 만나거나 활동적인 일을 한다', value: 'E' },
      { text: '집에서 혼자만의 시간을 보낸다', value: 'I' }
    ]
  },
  {
    id: '6',
    question: '전화 통화할 때 나는',
    options: [
      { text: '길게 이야기하는 것을 좋아한다', value: 'E' },
      { text: '필요한 말만 하고 빨리 끝낸다', value: 'I' }
    ]
  },
  {
    id: '7',
    question: '새로운 환경에서 나는',
    options: [
      { text: '빨리 적응하고 사람들과 어울린다', value: 'E' },
      { text: '시간을 두고 천천히 적응한다', value: 'I' }
    ]
  },
  {
    id: '8',
    question: '팀 프로젝트에서 나는',
    options: [
      { text: '토론을 주도하고 아이디어를 공유한다', value: 'E' },
      { text: '개별 작업을 선호하고 결과로 기여한다', value: 'I' }
    ]
  },
  {
    id: '9',
    question: '스트레스를 받을 때 나는',
    options: [
      { text: '사람들과 함께 있으며 해소한다', value: 'E' },
      { text: '혼자만의 공간에서 에너지를 회복한다', value: 'I' }
    ]
  },
  {
    id: '10',
    question: '생각을 정리할 때 나는',
    options: [
      { text: '말하면서 생각이 정리된다', value: 'E' },
      { text: '마음속으로 충분히 생각한 후 말한다', value: 'I' }
    ]
  },
  {
    id: '11',
    question: '친구와 갈등이 생겼을 때 나는',
    options: [
      { text: '바로 대화를 통해 해결하려고 한다', value: 'E' },
      { text: '시간을 두고 혼자 생각해본 후 접근한다', value: 'I' }
    ]
  },
  {
    id: '12',
    question: '새로운 취미를 시작할 때 나는',
    options: [
      { text: '관련 모임이나 커뮤니티에 참여한다', value: 'E' },
      { text: '혼자 공부하고 연습한 후 참여한다', value: 'I' }
    ]
  },
  {
    id: '13',
    question: '업무 중 휴식시간에 나는',
    options: [
      { text: '동료들과 이야기하며 시간을 보낸다', value: 'E' },
      { text: '혼자 조용히 휴식을 취한다', value: 'I' }
    ]
  },
  {
    id: '14',
    question: '새로운 아이디어가 떠올랐을 때 나는',
    options: [
      { text: '즉시 다른 사람들과 공유하고 싶다', value: 'E' },
      { text: '충분히 다듬은 후에 공유한다', value: 'I' }
    ]
  },
  {
    id: '15',
    question: '학습할 때 나는',
    options: [
      { text: '그룹 스터디나 토론을 선호한다', value: 'E' },
      { text: '개인 학습을 선호한다', value: 'I' }
    ]
  },
  {
    id: '16',
    question: '문제 해결 과정에서 나는',
    options: [
      { text: '다른 사람들과 브레인스토밍한다', value: 'E' },
      { text: '혼자 깊이 생각하며 해결책을 찾는다', value: 'I' }
    ]
  },
  {
    id: '17',
    question: '감정적으로 힘들 때 나는',
    options: [
      { text: '친구들에게 털어놓으며 위로받는다', value: 'E' },
      { text: '혼자 시간을 가지며 마음을 정리한다', value: 'I' }
    ]
  },
  {
    id: '18',
    question: '새로운 장소에 갔을 때 나는',
    options: [
      { text: '현지 사람들과 대화하며 정보를 얻는다', value: 'E' },
      { text: '혼자 탐험하며 관찰한다', value: 'I' }
    ]
  },
  {
    id: '19',
    question: '의견 충돌이 있을 때 나는',
    options: [
      { text: '공개적으로 토론하며 해결한다', value: 'E' },
      { text: '개별적으로 대화하며 해결한다', value: 'I' }
    ]
  },
  {
    id: '20',
    question: '새로운 프로젝트를 시작할 때 나는',
    options: [
      { text: '팀원들과 함께 계획을 세운다', value: 'E' },
      { text: '혼자 계획을 세운 후 공유한다', value: 'I' }
    ]
  },
  {
    id: '21',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '여러 사람의 의견을 듣고 결정한다', value: 'E' },
      { text: '혼자 충분히 고민한 후 결정한다', value: 'I' }
    ]
  },
  {
    id: '22',
    question: '새로운 기술을 배울 때 나는',
    options: [
      { text: '다른 사람들과 함께 배우는 것을 선호한다', value: 'E' },
      { text: '혼자 매뉴얼을 보며 배우는 것을 선호한다', value: 'I' }
    ]
  },
  {
    id: '23',
    question: '회사 회식에서 나는',
    options: [
      { text: '적극적으로 참여하며 분위기를 만든다', value: 'E' },
      { text: '조용히 참여하며 관찰한다', value: 'I' }
    ]
  },
  {
    id: '24',
    question: '새로운 도전을 할 때 나는',
    options: [
      { text: '다른 사람들과 함께 도전한다', value: 'E' },
      { text: '혼자 충분히 준비한 후 도전한다', value: 'I' }
    ]
  },
  {
    id: '25',
    question: '피드백을 받을 때 나는',
    options: [
      { text: '즉시 반응하고 토론한다', value: 'E' },
      { text: '먼저 들어보고 나중에 생각한다', value: 'I' }
    ]
  },
  {
    id: '26',
    question: '새로운 사람들과 일할 때 나는',
    options: [
      { text: '빨리 친해지려고 노력한다', value: 'E' },
      { text: '시간을 두고 천천히 관계를 형성한다', value: 'I' }
    ]
  },
  {
    id: '27',
    question: '창의적인 작업을 할 때 나는',
    options: [
      { text: '다른 사람들과 아이디어를 공유하며 발전시킨다', value: 'E' },
      { text: '혼자 집중하며 아이디어를 발전시킨다', value: 'I' }
    ]
  },
  {
    id: '28',
    question: '업무 스트레스를 해소할 때 나는',
    options: [
      { text: '동료들과 이야기하며 해소한다', value: 'E' },
      { text: '혼자 조용한 시간을 가지며 해소한다', value: 'I' }
    ]
  },
  {
    id: '29',
    question: '새로운 정보를 접할 때 나는',
    options: [
      { text: '다른 사람들과 공유하고 토론한다', value: 'E' },
      { text: '혼자 정리하고 이해한 후 공유한다', value: 'I' }
    ]
  },
  {
    id: '30',
    question: '갈등 상황에서 나는',
    options: [
      { text: '적극적으로 해결책을 제시한다', value: 'E' },
      { text: '상황을 관찰하고 신중하게 접근한다', value: 'I' }
    ]
  },
  {
    id: '31',
    question: '새로운 업무를 배울 때 나는',
    options: [
      { text: '선배들에게 적극적으로 질문한다', value: 'E' },
      { text: '먼저 혼자 파악한 후 질문한다', value: 'I' }
    ]
  },
  {
    id: '32',
    question: '팀 미팅에서 나는',
    options: [
      { text: '활발하게 의견을 제시한다', value: 'E' },
      { text: '필요할 때만 신중하게 발언한다', value: 'I' }
    ]
  },
  {
    id: '33',
    question: '새로운 환경에 적응할 때 나는',
    options: [
      { text: '주변 사람들과 적극적으로 소통한다', value: 'E' },
      { text: '먼저 환경을 관찰하고 이해한다', value: 'I' }
    ]
  },
  {
    id: '34',
    question: '아이디어를 발전시킬 때 나는',
    options: [
      { text: '여러 사람들과 브레인스토밍한다', value: 'E' },
      { text: '혼자 깊이 생각하며 발전시킨다', value: 'I' }
    ]
  },
  {
    id: '35',
    question: '새로운 기회가 생겼을 때 나는',
    options: [
      { text: '다른 사람들과 상의한 후 결정한다', value: 'E' },
      { text: '혼자 충분히 고민한 후 결정한다', value: 'I' }
    ]
  },
  {
    id: '36',
    question: '업무 중 중요한 결정을 내릴 때 나는',
    options: [
      { text: '관련자들과 회의를 통해 결정한다', value: 'E' },
      { text: '혼자 자료를 분석한 후 결정한다', value: 'I' }
    ]
  },
  {
    id: '37',
    question: '새로운 관계를 형성할 때 나는',
    options: [
      { text: '먼저 다가가 친분을 쌓는다', value: 'E' },
      { text: '상대방을 관찰한 후 천천히 접근한다', value: 'I' }
    ]
  },
  {
    id: '38',
    question: '복잡한 문제를 해결할 때 나는',
    options: [
      { text: '다른 사람들과 함께 해결책을 찾는다', value: 'E' },
      { text: '혼자 집중하며 해결책을 찾는다', value: 'I' }
    ]
  },
  {
    id: '39',
    question: '새로운 계획을 세울 때 나는',
    options: [
      { text: '관련된 사람들과 함께 계획한다', value: 'E' },
      { text: '혼자 계획을 세운 후 공유한다', value: 'I' }
    ]
  },
  {
    id: '40',
    question: '중요한 발표를 앞두고 나는',
    options: [
      { text: '다른 사람들 앞에서 연습한다', value: 'E' },
      { text: '혼자 충분히 연습한 후 발표한다', value: 'I' }
    ]
  },

  // S vs N 질문들 (40개)
  {
    id: '41',
    question: '정보를 받아들일 때 나는',
    options: [
      { text: '구체적인 사실과 세부사항을 중시한다', value: 'S' },
      { text: '전체적인 개념과 가능성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '42',
    question: '새로운 아이디어를 접할 때 나는',
    options: [
      { text: '실용성과 현실적 적용 가능성을 본다', value: 'S' },
      { text: '창의적 가능성과 혁신성을 본다', value: 'N' }
    ]
  },
  {
    id: '43',
    question: '계획을 세울 때 나는',
    options: [
      { text: '구체적인 단계와 일정을 중시한다', value: 'S' },
      { text: '전체적인 비전과 방향성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '44',
    question: '학습할 때 나는',
    options: [
      { text: '실습과 경험을 통해 배우는 것을 선호한다', value: 'S' },
      { text: '이론과 개념을 통해 배우는 것을 선호한다', value: 'N' }
    ]
  },
  {
    id: '45',
    question: '문제를 해결할 때 나는',
    options: [
      { text: '과거의 경험과 검증된 방법을 활용한다', value: 'S' },
      { text: '새로운 방법과 창의적 해결책을 모색한다', value: 'N' }
    ]
  },
  {
    id: '46',
    question: '업무를 처리할 때 나는',
    options: [
      { text: '단계별로 차근차근 진행한다', value: 'S' },
      { text: '전체적인 흐름을 파악하고 진행한다', value: 'N' }
    ]
  },
  {
    id: '47',
    question: '새로운 기술을 배울 때 나는',
    options: [
      { text: '매뉴얼을 따라 단계별로 익힌다', value: 'S' },
      { text: '원리를 이해하고 응용해본다', value: 'N' }
    ]
  },
  {
    id: '48',
    question: '회의에서 나는',
    options: [
      { text: '구체적인 데이터와 사실을 중시한다', value: 'S' },
      { text: '전체적인 전략과 방향성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '49',
    question: '보고서를 작성할 때 나는',
    options: [
      { text: '정확한 데이터와 구체적인 내용을 포함한다', value: 'S' },
      { text: '전체적인 흐름과 의미를 강조한다', value: 'N' }
    ]
  },
  {
    id: '50',
    question: '새로운 프로젝트를 시작할 때 나는',
    options: [
      { text: '구체적인 계획과 일정을 먼저 세운다', value: 'S' },
      { text: '전체적인 목표와 비전을 먼저 설정한다', value: 'N' }
    ]
  },
  {
    id: '51',
    question: '설명을 할 때 나는',
    options: [
      { text: '구체적인 예시와 사례를 들어 설명한다', value: 'S' },
      { text: '전체적인 개념과 원리를 설명한다', value: 'N' }
    ]
  },
  {
    id: '52',
    question: '새로운 정보를 기억할 때 나는',
    options: [
      { text: '구체적인 사실과 세부사항을 기억한다', value: 'S' },
      { text: '전체적인 맥락과 의미를 기억한다', value: 'N' }
    ]
  },
  {
    id: '53',
    question: '업무 우선순위를 정할 때 나는',
    options: [
      { text: '현재 상황과 현실적 제약을 고려한다', value: 'S' },
      { text: '미래 가능성과 잠재적 영향을 고려한다', value: 'N' }
    ]
  },
  {
    id: '54',
    question: '새로운 시스템을 도입할 때 나는',
    options: [
      { text: '검증된 시스템과 안정성을 중시한다', value: 'S' },
      { text: '혁신성과 발전 가능성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '55',
    question: '데이터를 분석할 때 나는',
    options: [
      { text: '정확한 수치와 구체적인 사실에 집중한다', value: 'S' },
      { text: '전체적인 패턴과 트렌드를 찾는다', value: 'N' }
    ]
  },
  {
    id: '56',
    question: '미팅을 준비할 때 나는',
    options: [
      { text: '구체적인 자료와 데이터를 준비한다', value: 'S' },
      { text: '전체적인 아이디어와 비전을 준비한다', value: 'N' }
    ]
  },
  {
    id: '57',
    question: '새로운 업무를 배울 때 나는',
    options: [
      { text: '실제 사례와 경험을 통해 배운다', value: 'S' },
      { text: '이론과 원리를 먼저 이해한다', value: 'N' }
    ]
  },
  {
    id: '58',
    question: '계획을 실행할 때 나는',
    options: [
      { text: '세부 단계를 정확히 따라 진행한다', value: 'S' },
      { text: '상황에 따라 유연하게 조정한다', value: 'N' }
    ]
  },
  {
    id: '59',
    question: '새로운 도구를 사용할 때 나는',
    options: [
      { text: '매뉴얼을 꼼꼼히 읽고 사용한다', value: 'S' },
      { text: '직관적으로 탐색하며 사용한다', value: 'N' }
    ]
  },
  {
    id: '60',
    question: '문제의 원인을 찾을 때 나는',
    options: [
      { text: '구체적인 사실과 증거를 분석한다', value: 'S' },
      { text: '전체적인 맥락과 연관성을 파악한다', value: 'N' }
    ]
  },
  {
    id: '61',
    question: '새로운 제품을 평가할 때 나는',
    options: [
      { text: '구체적인 기능과 성능을 중시한다', value: 'S' },
      { text: '혁신성과 미래 가능성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '62',
    question: '업무 개선을 할 때 나는',
    options: [
      { text: '현재 문제점을 구체적으로 파악한다', value: 'S' },
      { text: '새로운 방식의 가능성을 탐색한다', value: 'N' }
    ]
  },
  {
    id: '63',
    question: '교육을 받을 때 나는',
    options: [
      { text: '실무에 바로 적용할 수 있는 내용을 선호한다', value: 'S' },
      { text: '이론적 배경과 원리를 이해하는 것을 선호한다', value: 'N' }
    ]
  },
  {
    id: '64',
    question: '새로운 아이디어를 검토할 때 나는',
    options: [
      { text: '실현 가능성과 실용성을 먼저 본다', value: 'S' },
      { text: '창의성과 혁신성을 먼저 본다', value: 'N' }
    ]
  },
  {
    id: '65',
    question: '업무 진행 상황을 파악할 때 나는',
    options: [
      { text: '구체적인 진도와 결과를 확인한다', value: 'S' },
      { text: '전체적인 방향성과 흐름을 파악한다', value: 'N' }
    ]
  },
  {
    id: '66',
    question: '새로운 방법을 시도할 때 나는',
    options: [
      { text: '검증된 방법을 기반으로 시도한다', value: 'S' },
      { text: '완전히 새로운 방법을 시도한다', value: 'N' }
    ]
  },
  {
    id: '67',
    question: '복잡한 업무를 처리할 때 나는',
    options: [
      { text: '단계별로 나누어 체계적으로 진행한다', value: 'S' },
      { text: '전체적인 관점에서 접근한다', value: 'N' }
    ]
  },
  {
    id: '68',
    question: '새로운 정보를 습득할 때 나는',
    options: [
      { text: '구체적인 사실과 데이터를 먼저 파악한다', value: 'S' },
      { text: '전체적인 의미와 맥락을 먼저 파악한다', value: 'N' }
    ]
  },
  {
    id: '69',
    question: '업무 계획을 세울 때 나는',
    options: [
      { text: '현실적인 제약과 조건을 고려한다', value: 'S' },
      { text: '이상적인 목표와 비전을 설정한다', value: 'N' }
    ]
  },
  {
    id: '70',
    question: '새로운 기회를 평가할 때 나는',
    options: [
      { text: '구체적인 조건과 현실성을 검토한다', value: 'S' },
      { text: '잠재적 가능성과 미래 가치를 검토한다', value: 'N' }
    ]
  },
  {
    id: '71',
    question: '업무 결과를 평가할 때 나는',
    options: [
      { text: '구체적인 성과와 수치를 중시한다', value: 'S' },
      { text: '전체적인 영향과 의미를 중시한다', value: 'N' }
    ]
  },
  {
    id: '72',
    question: '새로운 트렌드를 접할 때 나는',
    options: [
      { text: '실용적 활용 방안을 먼저 생각한다', value: 'S' },
      { text: '미래 변화의 가능성을 먼저 생각한다', value: 'N' }
    ]
  },
  {
    id: '73',
    question: '프로젝트를 마무리할 때 나는',
    options: [
      { text: '구체적인 결과와 성과를 정리한다', value: 'S' },
      { text: '전체적인 경험과 교훈을 정리한다', value: 'N' }
    ]
  },
  {
    id: '74',
    question: '새로운 도전을 할 때 나는',
    options: [
      { text: '구체적인 준비와 계획을 중시한다', value: 'S' },
      { text: '새로운 가능성과 기회를 중시한다', value: 'N' }
    ]
  },
  {
    id: '75',
    question: '업무 개선점을 찾을 때 나는',
    options: [
      { text: '현재 문제점을 구체적으로 분석한다', value: 'S' },
      { text: '새로운 방향성과 가능성을 탐색한다', value: 'N' }
    ]
  },
  {
    id: '76',
    question: '새로운 정보를 공유할 때 나는',
    options: [
      { text: '구체적인 사실과 데이터를 중심으로 한다', value: 'S' },
      { text: '전체적인 의미와 시사점을 중심으로 한다', value: 'N' }
    ]
  },
  {
    id: '77',
    question: '업무 방식을 개선할 때 나는',
    options: [
      { text: '현재 방식의 문제점을 수정한다', value: 'S' },
      { text: '완전히 새로운 방식을 도입한다', value: 'N' }
    ]
  },
  {
    id: '78',
    question: '새로운 기술을 도입할 때 나는',
    options: [
      { text: '안정성과 검증된 효과를 중시한다', value: 'S' },
      { text: '혁신성과 발전 가능성을 중시한다', value: 'N' }
    ]
  },
  {
    id: '79',
    question: '업무 성과를 측정할 때 나는',
    options: [
      { text: '구체적인 지표와 수치를 활용한다', value: 'S' },
      { text: '전체적인 영향과 가치를 평가한다', value: 'N' }
    ]
  },
  {
    id: '80',
    question: '새로운 변화에 대응할 때 나는',
    options: [
      { text: '구체적인 대응 방안을 마련한다', value: 'S' },
      { text: '변화의 기회와 가능성을 탐색한다', value: 'N' }
    ]
  },

  // T vs F 질문들 (40개)
  {
    id: '81',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '객관적인 사실과 논리를 중시한다', value: 'T' },
      { text: '관련된 사람들의 감정과 가치를 중시한다', value: 'F' }
    ]
  },
  {
    id: '82',
    question: '갈등을 해결할 때 나는',
    options: [
      { text: '공정한 기준과 원칙을 적용한다', value: 'T' },
      { text: '관련된 사람들의 입장을 고려한다', value: 'F' }
    ]
  },
  {
    id: '83',
    question: '피드백을 할 때 나는',
    options: [
      { text: '객관적인 사실과 개선점을 중시한다', value: 'T' },
      { text: '상대방의 감정과 동기를 고려한다', value: 'F' }
    ]
  },
  {
    id: '84',
    question: '팀 내 문제를 해결할 때 나는',
    options: [
      { text: '논리적 분석과 체계적 접근을 한다', value: 'T' },
      { text: '팀원들의 화합과 관계를 중시한다', value: 'F' }
    ]
  },
  {
    id: '85',
    question: '새로운 정책을 평가할 때 나는',
    options: [
      { text: '효율성과 합리성을 중시한다', value: 'T' },
      { text: '사람들에게 미치는 영향을 중시한다', value: 'F' }
    ]
  },
  {
    id: '86',
    question: '업무 평가를 할 때 나는',
    options: [
      { text: '객관적인 성과와 결과를 중시한다', value: 'T' },
      { text: '노력과 개인적 상황을 고려한다', value: 'F' }
    ]
  },
  {
    id: '87',
    question: '의사결정 과정에서 나는',
    options: [
      { text: '데이터와 분석을 기반으로 한다', value: 'T' },
      { text: '관련자들의 의견과 감정을 고려한다', value: 'F' }
    ]
  },
  {
    id: '88',
    question: '비판을 할 때 나는',
    options: [
      { text: '객관적인 문제점을 직접적으로 지적한다', value: 'T' },
      { text: '상대방의 기분을 고려하여 신중하게 한다', value: 'F' }
    ]
  },
  {
    id: '89',
    question: '규칙과 예외 사이에서 나는',
    options: [
      { text: '일관된 원칙과 규칙을 적용한다', value: 'T' },
      { text: '개별 상황과 특수성을 고려한다', value: 'F' }
    ]
  },
  {
    id: '90',
    question: '팀 리더십을 발휘할 때 나는',
    options: [
      { text: '명확한 목표와 체계적 관리를 한다', value: 'T' },
      { text: '팀원들의 동기 부여와 협력을 중시한다', value: 'F' }
    ]
  },
  {
    id: '91',
    question: '업무 우선순위를 정할 때 나는',
    options: [
      { text: '효율성과 합리성을 기준으로 한다', value: 'T' },
      { text: '사람들의 필요와 상황을 고려한다', value: 'F' }
    ]
  },
  {
    id: '92',
    question: '새로운 프로젝트를 평가할 때 나는',
    options: [
      { text: '비용 대비 효과와 논리적 타당성을 본다', value: 'T' },
      { text: '팀원들의 만족도와 발전 가능성을 본다', value: 'F' }
    ]
  },
  {
    id: '93',
    question: '실수를 대할 때 나는',
    options: [
      { text: '원인을 분석하고 체계적으로 개선한다', value: 'T' },
      { text: '감정적 영향을 고려하고 격려한다', value: 'F' }
    ]
  },
  {
    id: '94',
    question: '업무 분배를 할 때 나는',
    options: [
      { text: '능력과 전문성을 기준으로 한다', value: 'T' },
      { text: '개인의 성향과 발전 기회를 고려한다', value: 'F' }
    ]
  },
  {
    id: '95',
    question: '성과를 인정할 때 나는',
    options: [
      { text: '객관적인 결과와 기여도를 중시한다', value: 'T' },
      { text: '개인의 노력과 성장을 함께 인정한다', value: 'F' }
    ]
  },
  {
    id: '96',
    question: '조직 변화를 추진할 때 나는',
    options: [
      { text: '효율성과 합리성을 중심으로 한다', value: 'T' },
      { text: '구성원들의 적응과 수용을 중시한다', value: 'F' }
    ]
  },
  {
    id: '97',
    question: '동료와 의견 차이가 있을 때 나는',
    options: [
      { text: '논리적 근거를 제시하며 설득한다', value: 'T' },
      { text: '상호 이해와 공감을 통해 해결한다', value: 'F' }
    ]
  },
  {
    id: '98',
    question: '업무 효율성을 높일 때 나는',
    options: [
      { text: '시스템과 프로세스 개선에 집중한다', value: 'T' },
      { text: '사람들의 동기와 만족도를 고려한다', value: 'F' }
    ]
  },
  {
    id: '99',
    question: '새로운 아이디어를 평가할 때 나는',
    options: [
      { text: '실현 가능성과 효과를 논리적으로 분석한다', value: 'T' },
      { text: '창의성과 사람들의 반응을 고려한다', value: 'F' }
    ]
  },
  {
    id: '100',
    question: '팀 내 갈등을 중재할 때 나는',
    options: [
      { text: '공정한 판단과 원칙을 적용한다', value: 'T' },
      { text: '각자의 입장을 이해하고 조율한다', value: 'F' }
    ]
  },
  {
    id: '101',
    question: '업무 목표를 설정할 때 나는',
    options: [
      { text: '명확하고 측정 가능한 목표를 설정한다', value: 'T' },
      { text: '개인의 성장과 만족을 함께 고려한다', value: 'F' }
    ]
  },
  {
    id: '102',
    question: '직장 내 문제를 해결할 때 나는',
    options: [
      { text: '체계적이고 논리적인 접근을 한다', value: 'T' },
      { text: '관련된 사람들의 감정과 관계를 고려한다', value: 'F' }
    ]
  },
  {
    id: '103',
    question: '새로운 제도를 도입할 때 나는',
    options: [
      { text: '효율성과 공정성을 중시한다', value: 'T' },
      { text: '구성원들의 적응과 만족도를 중시한다', value: 'F' }
    ]
  },
  {
    id: '104',
    question: '업무 성과를 관리할 때 나는',
    options: [
      { text: '객관적인 지표와 시스템을 활용한다', value: 'T' },
      { text: '개인적 상황과 동기를 함께 고려한다', value: 'F' }
    ]
  },
  {
    id: '105',
    question: '팀원을 지도할 때 나는',
    options: [
      { text: '명확한 기준과 체계적 피드백을 제공한다', value: 'T' },
      { text: '개인의 특성과 성장 속도를 고려한다', value: 'F' }
    ]
  },
  {
    id: '106',
    question: '조직 내 소통을 할 때 나는',
    options: [
      { text: '명확하고 직접적인 의사소통을 한다', value: 'T' },
      { text: '상대방의 감정과 상황을 고려한다', value: 'F' }
    ]
  },
  {
    id: '107',
    question: '업무 개선을 제안할 때 나는',
    options: [
      { text: '논리적 근거와 데이터를 제시한다', value: 'T' },
      { text: '관련자들의 의견과 수용성을 고려한다', value: 'F' }
    ]
  },
  {
    id: '108',
    question: '팀 내 역할을 분담할 때 나는',
    options: [
      { text: '능력과 효율성을 우선 고려한다', value: 'T' },
      { text: '개인의 선호와 발전 기회를 고려한다', value: 'F' }
    ]
  },
  {
    id: '109',
    question: '업무 품질을 관리할 때 나는',
    options: [
      { text: '명확한 기준과 체계적 점검을 한다', value: 'T' },
      { text: '개인의 노력과 상황을 함께 고려한다', value: 'F' }
    ]
  },
  {
    id: '110',
    question: '새로운 도전을 평가할 때 나는',
    options: [
      { text: '위험과 이익을 논리적으로 분석한다', value: 'T' },
      { text: '팀원들의 의지와 가능성을 고려한다', value: 'F' }
    ]
  },
  {
    id: '111',
    question: '업무 스케줄을 관리할 때 나는',
    options: [
      { text: '효율성과 일정 준수를 중시한다', value: 'T' },
      { text: '개인의 상황과 여유를 고려한다', value: 'F' }
    ]
  },
  {
    id: '112',
    question: '팀 성과를 평가할 때 나는',
    options: [
      { text: '객관적인 결과와 수치를 중시한다', value: 'T' },
      { text: '과정과 팀워크를 함께 평가한다', value: 'F' }
    ]
  },
  {
    id: '113',
    question: '업무 환경을 개선할 때 나는',
    options: [
      { text: '효율성과 생산성을 중심으로 한다', value: 'T' },
      { text: '직원들의 만족도와 복지를 중시한다', value: 'F' }
    ]
  },
  {
    id: '114',
    question: '새로운 정책을 시행할 때 나는',
    options: [
      { text: '일관성과 공정성을 중시한다', value: 'T' },
      { text: '개별 상황과 특수성을 고려한다', value: 'F' }
    ]
  },
  {
    id: '115',
    question: '업무 관련 결정을 할 때 나는',
    options: [
      { text: '데이터와 분석을 기반으로 한다', value: 'T' },
      { text: '관련자들의 의견과 감정을 고려한다', value: 'F' }
    ]
  },
  {
    id: '116',
    question: '팀 내 변화를 이끌 때 나는',
    options: [
      { text: '논리적 필요성과 효과를 강조한다', value: 'T' },
      { text: '구성원들의 공감과 동참을 이끈다', value: 'F' }
    ]
  },
  {
    id: '117',
    question: '업무 결과를 검토할 때 나는',
    options: [
      { text: '객관적인 기준과 분석을 적용한다', value: 'T' },
      { text: '과정과 노력을 함께 고려한다', value: 'F' }
    ]
  },
  {
    id: '118',
    question: '조직 내 커뮤니케이션을 할 때 나는',
    options: [
      { text: '명확하고 효율적인 전달을 중시한다', value: 'T' },
      { text: '상호 이해와 공감을 중시한다', value: 'F' }
    ]
  },
  {
    id: '119',
    question: '업무 프로세스를 개선할 때 나는',
    options: [
      { text: '효율성과 합리성을 중심으로 한다', value: 'T' },
      { text: '사용자들의 편의성과 만족도를 고려한다', value: 'F' }
    ]
  },
  {
    id: '120',
    question: '팀 목표를 달성할 때 나는',
    options: [
      { text: '체계적인 관리와 성과 중심으로 한다', value: 'T' },
      { text: '팀원들의 동기와 협력을 중시한다', value: 'F' }
    ]
  },

  // J vs P 질문들 (40개)
  {
    id: '121',
    question: '일정 관리를 할 때 나는',
    options: [
      { text: '미리 계획을 세우고 체계적으로 관리한다', value: 'J' },
      { text: '상황에 따라 유연하게 조정한다', value: 'P' }
    ]
  },
  {
    id: '122',
    question: '새로운 프로젝트를 시작할 때 나는',
    options: [
      { text: '상세한 계획과 일정을 먼저 세운다', value: 'J' },
      { text: '기본 방향을 정하고 진행하며 조정한다', value: 'P' }
    ]
  },
  {
    id: '123',
    question: '업무 마감일을 대할 때 나는',
    options: [
      { text: '미리 준비하고 여유를 두고 완료한다', value: 'J' },
      { text: '마감에 맞춰 집중적으로 완료한다', value: 'P' }
    ]
  },
  {
    id: '124',
    question: '회의 진행을 할 때 나는',
    options: [
      { text: '사전 계획에 따라 체계적으로 진행한다', value: 'J' },
      { text: '상황에 따라 유연하게 진행한다', value: 'P' }
    ]
  },
  {
    id: '125',
    question: '업무 환경을 조성할 때 나는',
    options: [
      { text: '정리정돈된 체계적인 환경을 선호한다', value: 'J' },
      { text: '자유롭고 창의적인 환경을 선호한다', value: 'P' }
    ]
  },
  {
    id: '126',
    question: '결정을 내릴 때 나는',
    options: [
      { text: '충분한 정보를 수집한 후 신속히 결정한다', value: 'J' },
      { text: '다양한 가능성을 열어두고 천천히 결정한다', value: 'P' }
    ]
  },
  {
    id: '127',
    question: '업무 방식을 정할 때 나는',
    options: [
      { text: '일관된 방식과 규칙을 설정한다', value: 'J' },
      { text: '상황에 맞는 다양한 방식을 시도한다', value: 'P' }
    ]
  },
  {
    id: '128',
    question: '목표를 달성할 때 나는',
    options: [
      { text: '단계적 계획을 세우고 체계적으로 실행한다', value: 'J' },
      { text: '다양한 방법을 시도하며 유연하게 접근한다', value: 'P' }
    ]
  },
  {
    id: '129',
    question: '업무 우선순위를 정할 때 나는',
    options: [
      { text: '명확한 기준으로 우선순위를 정한다', value: 'J' },
      { text: '상황에 따라 우선순위를 조정한다', value: 'P' }
    ]
  },
  {
    id: '130',
    question: '새로운 업무를 배울 때 나는',
    options: [
      { text: '체계적인 학습 계획을 세운다', value: 'J' },
      { text: '필요에 따라 즉석에서 배운다', value: 'P' }
    ]
  },
  {
    id: '131',
    question: '업무 진행 상황을 관리할 때 나는',
    options: [
      { text: '정기적으로 점검하고 관리한다', value: 'J' },
      { text: '필요할 때마다 확인하고 조정한다', value: 'P' }
    ]
  },
  {
    id: '132',
    question: '변화에 대응할 때 나는',
    options: [
      { text: '사전에 준비하고 체계적으로 대응한다', value: 'J' },
      { text: '상황에 맞춰 즉시 대응한다', value: 'P' }
    ]
  },
  {
    id: '133',
    question: '업무 완료를 확인할 때 나는',
    options: [
      { text: '체크리스트를 활용해 체계적으로 확인한다', value: 'J' },
      { text: '전체적으로 검토하며 유연하게 확인한다', value: 'P' }
    ]
  },
  {
    id: '134',
    question: '새로운 기회를 대할 때 나는',
    options: [
      { text: '신중하게 계획한 후 실행한다', value: 'J' },
      { text: '일단 시도해보며 조정한다', value: 'P' }
    ]
  },
  {
    id: '135',
    question: '업무 스케줄을 세울 때 나는',
    options: [
      { text: '구체적인 시간 계획을 세운다', value: 'J' },
      { text: '대략적인 계획을 세우고 유연하게 조정한다', value: 'P' }
    ]
  },
  {
    id: '136',
    question: '업무 완료 기준을 정할 때 나는',
    options: [
      { text: '명확한 기준과 체크포인트를 설정한다', value: 'J' },
      { text: '상황에 따라 유연하게 조정한다', value: 'P' }
    ]
  },
  {
    id: '137',
    question: '팀 업무를 조율할 때 나는',
    options: [
      { text: '체계적인 역할 분담과 일정 관리를 한다', value: 'J' },
      { text: '상황에 맞춰 유연하게 조율한다', value: 'P' }
    ]
  },
  {
    id: '138',
    question: '업무 개선을 할 때 나는',
    options: [
      { text: '체계적인 분석과 계획을 통해 개선한다', value: 'J' },
      { text: '다양한 시도를 통해 점진적으로 개선한다', value: 'P' }
    ]
  },
  {
    id: '139',
    question: '새로운 도구를 도입할 때 나는',
    options: [
      { text: '충분한 검토와 계획 후 도입한다', value: 'J' },
      { text: '일단 시도해보며 적응한다', value: 'P' }
    ]
  },
  {
    id: '140',
    question: '업무 성과를 측정할 때 나는',
    options: [
      { text: '명확한 지표와 기준을 설정한다', value: 'J' },
      { text: '다양한 관점에서 유연하게 평가한다', value: 'P' }
    ]
  },
  {
    id: '141',
    question: '프로젝트를 마무리할 때 나는',
    options: [
      { text: '체계적으로 정리하고 완료한다', value: 'J' },
      { text: '핵심 부분을 중심으로 마무리한다', value: 'P' }
    ]
  },
  {
    id: '142',
    question: '업무 방향을 설정할 때 나는',
    options: [
      { text: '명확한 목표와 방향을 설정한다', value: 'J' },
      { text: '여러 가능성을 열어두고 진행한다', value: 'P' }
    ]
  },
  {
    id: '143',
    question: '시간 관리를 할 때 나는',
    options: [
      { text: '정해진 시간에 맞춰 체계적으로 관리한다', value: 'J' },
      { text: '상황에 따라 유연하게 조정한다', value: 'P' }
    ]
  },
  {
    id: '144',
    question: '업무 품질을 관리할 때 나는',
    options: [
      { text: '일관된 기준과 체계적 관리를 한다', value: 'J' },
      { text: '상황에 맞는 유연한 관리를 한다', value: 'P' }
    ]
  },
  {
    id: '145',
    question: '새로운 환경에서 일할 때 나는',
    options: [
      { text: '체계적인 적응 계획을 세운다', value: 'J' },
      { text: '상황에 맞춰 자연스럽게 적응한다', value: 'P' }
    ]
  },
  {
    id: '146',
    question: '업무 절차를 개선할 때 나는',
    options: [
      { text: '표준화된 절차와 규칙을 만든다', value: 'J' },
      { text: '상황에 맞는 다양한 방법을 개발한다', value: 'P' }
    ]
  },
  {
    id: '147',
    question: '팀 목표를 달성할 때 나는',
    options: [
      { text: '체계적인 계획과 관리를 통해 달성한다', value: 'J' },
      { text: '상황에 맞는 유연한 접근으로 달성한다', value: 'P' }
    ]
  },
  {
    id: '148',
    question: '업무 효율성을 높일 때 나는',
    options: [
      { text: '체계적인 시스템과 프로세스를 구축한다', value: 'J' },
      { text: '상황에 맞는 다양한 방법을 시도한다', value: 'P' }
    ]
  },
  {
    id: '149',
    question: '새로운 아이디어를 실행할 때 나는',
    options: [
      { text: '구체적인 계획을 세운 후 실행한다', value: 'J' },
      { text: '일단 시작하고 진행하며 조정한다', value: 'P' }
    ]
  },
  {
    id: '150',
    question: '업무 결과를 관리할 때 나는',
    options: [
      { text: '명확한 기준과 체계적 관리를 한다', value: 'J' },
      { text: '상황에 맞는 유연한 관리를 한다', value: 'P' }
    ]
  },
  {
    id: '151',
    question: '조직 내 변화를 이끌 때 나는',
    options: [
      { text: '체계적인 계획과 단계적 실행을 한다', value: 'J' },
      { text: '상황에 맞는 유연한 접근을 한다', value: 'P' }
    ]
  },
  {
    id: '152',
    question: '업무 완료를 확인할 때 나는',
    options: [
      { text: '모든 세부사항을 체계적으로 확인한다', value: 'J' },
      { text: '핵심 요소를 중심으로 확인한다', value: 'P' }
    ]
  },
  {
    id: '153',
    question: '새로운 도전을 계획할 때 나는',
    options: [
      { text: '구체적인 준비와 계획을 세운다', value: 'J' },
      { text: '기본 방향을 정하고 상황에 맞춰 진행한다', value: 'P' }
    ]
  },
  {
    id: '154',
    question: '업무 성과를 향상시킬 때 나는',
    options: [
      { text: '체계적인 분석과 개선 계획을 세운다', value: 'J' },
      { text: '다양한 시도를 통해 점진적으로 개선한다', value: 'P' }
    ]
  },
  {
    id: '155',
    question: '팀 협업을 이끌 때 나는',
    options: [
      { text: '명확한 역할과 책임을 정한다', value: 'J' },
      { text: '상황에 맞춰 유연하게 협업한다', value: 'P' }
    ]
  },
  {
    id: '156',
    question: '업무 환경을 개선할 때 나는',
    options: [
      { text: '체계적인 분석과 계획을 통해 개선한다', value: 'J' },
      { text: '필요에 따라 즉시 개선한다', value: 'P' }
    ]
  },
  {
    id: '157',
    question: '새로운 프로세스를 만들 때 나는',
    options: [
      { text: '명확한 절차와 규칙을 설정한다', value: 'J' },
      { text: '상황에 맞는 유연한 방법을 개발한다', value: 'P' }
    ]
  },
  {
    id: '158',
    question: '업무 목표를 관리할 때 나는',
    options: [
      { text: '구체적인 계획과 일정으로 관리한다', value: 'J' },
      { text: '상황에 맞춰 유연하게 조정한다', value: 'P' }
    ]
  },
  {
    id: '159',
    question: '팀 성과를 개선할 때 나는',
    options: [
      { text: '체계적인 분석과 개선 방안을 제시한다', value: 'J' },
      { text: '다양한 시도를 통해 개선한다', value: 'P' }
    ]
  },
  {
    id: '160',
    question: '업무를 마무리할 때 나는',
    options: [
      { text: '모든 부분을 완벽하게 정리한다', value: 'J' },
      { text: '핵심 부분을 중심으로 마무리한다', value: 'P' }
    ]
  }
];