import os
import sys
import codecs

def detect_encoding(file_path):
    """
    파일의 인코딩을 감지합니다.
    """
    encodings = ['utf-8', 'euc-kr', 'cp949']
    
    for encoding in encodings:
        try:
            with codecs.open(file_path, 'r', encoding=encoding) as f:
                f.read()
                return encoding
        except UnicodeDecodeError:
            continue
    
    return 'utf-8'  # 기본값

def split_file_by_lines(input_file, output_dir, lines_per_file=1000):
    """
    파일을 지정된 줄 수로 분할합니다.
    
    Args:
        input_file (str): 입력 파일 경로
        output_dir (str): 출력 디렉토리 경로
        lines_per_file (int): 파일당 줄 수
    """
    # 출력 디렉토리가 없으면 생성
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # 파일 인코딩 감지
    encoding = detect_encoding(input_file)
    print(f"파일 인코딩: {encoding}")
    
    # 파일 이름 추출
    base_name = os.path.basename(input_file)
    name, ext = os.path.splitext(base_name)
    
    # 파일 읽기
    with codecs.open(input_file, 'r', encoding=encoding) as f:
        lines = f.readlines()
    
    # 파일 분할
    total_lines = len(lines)
    file_count = (total_lines + lines_per_file - 1) // lines_per_file
    
    for i in range(file_count):
        start_idx = i * lines_per_file
        end_idx = min((i + 1) * lines_per_file, total_lines)
        
        output_file = os.path.join(output_dir, f"{name}_{i+1:04d}{ext}")
        
        with codecs.open(output_file, 'w', encoding=encoding) as f:
            f.writelines(lines[start_idx:end_idx])
        
        print(f"파일 생성: {output_file} ({end_idx - start_idx}줄)")
    
    print(f"총 {total_lines}줄이 {file_count}개 파일로 분할되었습니다.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("사용법: python splitFileline_for_only_encodedstr.py <입력파일> <출력디렉토리> [분할줄수]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_dir = sys.argv[2]
    
    lines_per_file = 1000
    if len(sys.argv) > 3:
        lines_per_file = int(sys.argv[3])
    
    split_file_by_lines(input_file, output_dir, lines_per_file) 