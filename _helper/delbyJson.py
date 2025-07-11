import os
import json
import sys
import fnmatch

def delete_files_by_json(json_files):
    """
    JSON 파일에 나열된 파일들을 삭제합니다.
    
    Args:
        json_files (list): JSON 파일 경로 목록
    """
    deleted_count = 0
    failed_files = []
    
    for json_file in json_files:
        if not os.path.exists(json_file):
            print(f"파일을 찾을 수 없음: {json_file}")
            continue
        
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                file_list = json.load(f)
            
            if not isinstance(file_list, list):
                print(f"오류: {json_file}이 유효한 파일 목록이 아닙니다.")
                continue
            
            for file_pattern in file_list:
                # 와일드카드 패턴 지원
                if '*' in file_pattern:
                    matching_files = []
                    for root, _, files in os.walk('.'):
                        for filename in files:
                            file_path = os.path.join(root, filename).replace('\\', '/')
                            if file_path.startswith('./'):
                                file_path = file_path[2:]
                            if fnmatch.fnmatch(file_path, file_pattern):
                                matching_files.append(file_path)
                    
                    for file_path in matching_files:
                        try:
                            if os.path.exists(file_path):
                                os.remove(file_path)
                                print(f"삭제됨: {file_path}")
                                deleted_count += 1
                        except Exception as e:
                            print(f"삭제 실패: {file_path} - {str(e)}")
                            failed_files.append(file_path)
                else:
                    # 일반 파일 삭제
                    try:
                        if os.path.exists(file_pattern):
                            os.remove(file_pattern)
                            print(f"삭제됨: {file_pattern}")
                            deleted_count += 1
                        else:
                            print(f"파일을 찾을 수 없음: {file_pattern}")
                            failed_files.append(file_pattern)
                    except Exception as e:
                        print(f"삭제 실패: {file_pattern} - {str(e)}")
                        failed_files.append(file_pattern)
        
        except Exception as e:
            print(f"JSON 파일 처리 중 오류 발생: {json_file} - {str(e)}")
    
    # 실패한 파일 목록 저장
    if failed_files:
        os.makedirs('_tmp', exist_ok=True)
        with open('_tmp/delFailFiles.txt', 'w', encoding='utf-8') as f:
            for file_path in failed_files:
                f.write(f"{file_path}\n")
        print(f"삭제 실패한 파일 목록이 _tmp/delFailFiles.txt에 저장되었습니다.")
    
    print(f"총 {deleted_count}개 파일이 삭제되었습니다.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python delbyJson.py <JSON파일1> [JSON파일2] ...")
        sys.exit(1)
    
    json_files = sys.argv[1:]
    delete_files_by_json(json_files) 