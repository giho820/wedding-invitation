import type { NextPageContext } from "next";

const statusMessages: Record<number, string> = {
  404: "페이지를 찾을 수 없습니다",
  500: "서버 오류가 발생했습니다",
};

export default function Error({
  statusCode,
}: {
  statusCode?: number;
  title?: string;
}) {
  const code = statusCode ?? 500;
  const message = statusMessages[code] ?? "오류가 발생했습니다";

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>{code}</h1>
      <p>{message}</p>
      <a href="/">메인으로 돌아가기</a>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
