import os
import json
import sys

def get_all_files(root_dir='.', exclude_dirs=None):
    """
    프로젝트 내의 모든 파일 목록을 가져옵니다.
    
    Args:
        root_dir (str): 스캔할 루트 디렉토리
        exclude_dirs (list): 제외할 디렉토리 목록
    
    Returns:
        list: 상대 경로 파일 목록
    """
    if exclude_dirs is None:
        exclude_dirs = [
            './core', './backup', './__pycache__', './game_states', './logs', './log',
            './_helper', './_history', './_analysis', './_plan', './_tmp', './_usrtest',
            './node_modules', './dist', './.git'
        ]
    
    # 추가 제외 디렉토리 파일이 있는지 확인
    additional_exclude_file = './_usrtest/additional_exclude_dirs.txt'
    if os.path.exists(additional_exclude_file):
        with open(additional_exclude_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    exclude_dirs.append(line)
    
    # 명령줄 인수로 추가 제외 디렉토리 처리
    if len(sys.argv) > 1:
        exclude_dirs.extend(sys.argv[1:])
    
    all_files = []
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 제외 디렉토리 필터링
        dirnames[:] = [d for d in dirnames if os.path.join(dirpath, d).replace('\\', '/') not in exclude_dirs]
        
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            # 상대 경로로 변환
            rel_path = os.path.relpath(file_path, root_dir)
            # Windows 경로 구분자를 Unix 스타일로 변환
            rel_path = rel_path.replace('\\', '/')
            all_files.append(rel_path)
    
    return all_files

if __name__ == "__main__":
    files = get_all_files()
    
    # 결과를 JSON 파일로 저장
    with open('_helper/all_files.json', 'w', encoding='utf-8') as f:
        json.dump(files, f, ensure_ascii=False, indent=2)
    
    print(f"총 {len(files)}개 파일이 _helper/all_files.json에 저장되었습니다.") 