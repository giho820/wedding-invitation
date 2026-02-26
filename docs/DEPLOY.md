# EC2 배포 가이드 (GitHub Actions 자동 배포)

Public GitHub 레포지토리 + EC2 + GitHub Actions로 `main` 브랜치에 push할 때마다 자동 배포하는 방법입니다.

---

## 1. EC2 인스턴스 준비

### 1-1. EC2 생성

- AWS 콘솔에서 Ubuntu 22.04 LTS 등으로 인스턴스 생성
- **보안 그룹**: SSH(22), HTTP(80), HTTPS(443) 인바운드 허용
- 키 페어(.pem) 다운로드 후 안전한 곳에 보관

### 1-2. EC2에 접속 후 환경 설치

```bash
# SSH 접속 (예: 키가 ~/.ssh/my-key.pem 일 때)
ssh -i ~/.ssh/my-key.pem ubuntu@<EC2_퍼블릭_IP>

# Node.js 20 LTS 설치 (Next.js 15 권장)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 전역 설치 (프로세스 관리)
sudo npm install -g pm2

# Git 확인 (보통 설치됨)
git --version
```

---

## 2. EC2에서 프로젝트 클론 및 설정

### 2-1. 레포 클론

```bash
# 원하는 경로로 이동 (예: 홈 디렉터리)
cd ~
git clone https://github.com/<당신의_유저명>/wedding-invitation.git
cd wedding-invitation
```

`<당신의_유저명>`은 본인 GitHub 사용자명 또는 조직명으로 바꾸세요.

### 2-2. 환경 변수 파일 생성

EC2에는 **절대** GitHub에 올리지 말고, 서버에서만 `.env.local`을 만듭니다.

```bash
nano .env.local
```

아래 내용을 **실제 값**으로 채워 넣고 저장합니다.

```env
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=실제_네이버_지도_클라이언트_ID
NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_DEV_MODE=false
```

저장: `Ctrl+O` → Enter → `Ctrl+X`

### 2-3. 수동으로 한 번 빌드·실행 테스트

빌드에는 Tailwind 등 **devDependencies**가 필요하므로, `npm ci` 시 `NODE_ENV=development`로 설치합니다.

```bash
export NODE_ENV=development
npm ci
npm run build
export NODE_ENV=production
pm2 start npm --name "wedding-invitation" -- start
pm2 save
pm2 startup   # 재부팅 시 자동 실행 안내 나오면 그 명령 실행
```

브라우저에서 `http://<EC2_퍼블릭_IP>:3000` 으로 접속해 보세요.  
이후 GitHub Actions가 같은 경로에서 `git pull` → `npm ci` → `npm run build` → `pm2 restart` 를 수행합니다.

---

## 3. GitHub Secrets 설정

GitHub 레포지토리 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** 에서 아래 4개를 추가합니다.

| Secret 이름 | 설명 | 예시 |
|-------------|------|------|
| `EC2_HOST` | EC2 퍼블릭 IP 또는 도메인 | `13.124.xxx.xxx` |
| `EC2_USER` | SSH 사용자명 | `ubuntu` (Amazon Linux면 `ec2-user`) |
| `EC2_APP_PATH` | 앱이 클론된 절대 경로 | `/home/ubuntu/wedding-invitation` |
| `EC2_SSH_PRIVATE_KEY` | EC2 키 페어 **전체 내용** | 아래 참고 |

### EC2_SSH_PRIVATE_KEY 넣는 방법

로컬에서 키 파일 전체 내용을 복사해 Secret 값으로 붙여넣습니다.

```bash
# macOS / Linux
cat ~/.ssh/my-key.pem
```

출력된 내용 **전체**(`-----BEGIN ...` 부터 `-----END ...` 까지, 줄바꿈 포함)를 복사한 뒤, GitHub에서 `EC2_SSH_PRIVATE_KEY` 값에 붙여넣습니다.

---

## 4. 자동 배포 확인

1. 로컬에서 코드 수정 후 `main` 브랜치에 push 합니다.
2. GitHub 레포지토리 **Actions** 탭에서 "Deploy to EC2" 워크플로가 실행되는지 확인합니다.
3. 성공하면 EC2에서 자동으로 최신 코드로 빌드·재시작됩니다.

---

## 5. (선택) Nginx + 도메인 + HTTPS

- **도메인**: EC2 퍼블릭 IP 대신 도메인을 쓰려면 Route 53 등에서 A 레코드로 EC2 IP를 가리키면 됩니다.
- **80/443 포트**: Nginx를 앞단에 두고, Next.js는 `localhost:3000`에서만 돌리도록 할 수 있습니다.
- **HTTPS**: Let’s Encrypt + Certbot으로 무료 SSL 인증서 발급 후 Nginx에 설정하면 됩니다.

이 부분이 필요하면 Nginx 설정 예시도 별도로 정리해 드릴 수 있습니다.

---

## 6. 문제 해결

### `Cannot find module '@tailwindcss/postcss'`

- **원인**: 서버에 `NODE_ENV=production`이 설정돼 있으면 `npm ci`가 devDependencies를 설치하지 않습니다. Next.js 빌드에는 Tailwind/PostCSS가 필요해 이때 에러가 납니다.
- **해결**: 프로젝트 루트에서 아래처럼 **devDependencies를 설치한 뒤** 빌드하세요.
  ```bash
  export NODE_ENV=development
  npm ci
  npm run build
  export NODE_ENV=production
  pm2 restart wedding-invitation
  ```
- GitHub Actions 워크플로에는 이미 위 순서가 반영돼 있습니다.

---

## 요약 체크리스트

- [ ] EC2 생성, SSH·HTTP(·HTTPS) 보안 그룹 설정
- [ ] EC2에 Node.js 20, PM2, Git 설치
- [ ] EC2에서 레포 클론, `.env.local` 생성
- [ ] 수동으로 `npm ci` → `npm run build` → `pm2 start` 로 동작 확인
- [ ] GitHub Secrets 4개 설정 (EC2_HOST, EC2_USER, EC2_APP_PATH, EC2_SSH_PRIVATE_KEY)
- [ ] `main`에 push 후 Actions에서 배포 성공 확인

이 순서대로 하시면 Public 레포 + EC2 + GitHub Actions 자동 배포가 완료됩니다.
