const path = require("path"); // 파일 경로를 다루기 위한 유틸리티
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML 파일을 생성하는 플러그인
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 빌드 디렉토리를 정리하는 플러그인

module.exports = {
    mode: "development", // Webpack의 작동 모드
    entry: "./src/index.tsx", // 애플리케이션의 진입점을 설정

    // 빌드 결과물의 출력 설정
    output: {
        filename: "bundle.js", // 출력할 파일 이름을 설정
        path: path.resolve(__dirname, "dist"), // 출력할 경로를 설정. '__dirname'은 현재 디렉토리의 경로를 의미.
        clean: true, // 출력할 디렉토리를 정리(이전 빌드 결과물 삭제)
    },

    resolve: {
        // 모듈 해석에 사용할 확장자를 설정
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            // '@'을 src 디렉토리의 절대 경로로 설정
            "@": path.resolve(__dirname, "src"),
        },
    },

    module: {
        // 모듈에 대한 규칙을 정의
        rules: [
            {
                test: /\.tsx?$/, // TypeScript 파일을 처리하기 위한 정규 표현식
                use: "ts-loader", // 'ts-loader'를 사용하여 TypeScript 파일을 JavaScript로 변환
                exclude: /node_modules/, // node_modules 디렉토리 제외
            },
            {
                test: /\.css$/i, // *.css 파일
                use: [
                    "style-loader", // 스타일을 <style> 태그에 추가
                    "css-loader", // CSS 파일을 읽을 수 있게함
                    "postcss-loader",
                ],
            },
        ],
    },

    // 개발 서버의 설정
    devServer: {
        // 정적 파일을 제공할 디렉토리
        static: {
            directory: "./dist",
        },
        hot: true, // 핫 리로딩을 활성화
        historyApiFallback: true, // 모든 경로를 index.html로 리디렉션
    },

    // 플러그인 설정
    plugins: [
        new CleanWebpackPlugin(), // 빌드 과정에서 이전에 생성된 파일이나 디렉토리를 자동으로 삭제
        // HTML 파일을 생성하고, 빌드된 JavaScript 및 CSS 파일을 자동으로 HTML에 포함시킴
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 템플릿으로 사용할 HTML 파일의 경로
        }),
    ],
};
