# nếu bản update là bắt buộc phải cập nhật đến người dùng ngay khi mở app.
#
echo "RUN: appcenter codepush release-react:ANDROID env: $1 version: $2"
appcenter codepush release-react -a Marks-Jarvis/Jarvis-android -m -d $1 -t $2

echo "RUN: appcenter codepush release-react:IOS env: $1 version:$2"
appcenter codepush release-react -a Marks-Jarvis/Jarvis-ios -m  -d $1 -t $2
