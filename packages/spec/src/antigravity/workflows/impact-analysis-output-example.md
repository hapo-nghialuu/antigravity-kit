# Ví Dụ Output: Phân Tích Impact - Thêm Xác Thực Sinh Trắc Học

> Đây là ví dụ output mẫu từ workflow Impact Analysis cho một thay đổi code thực tế.
> 
> **Thay đổi**: Thêm tính năng xác thực sinh trắc học (Face ID/Touch ID) vào app React Native
> 
> **Files thay đổi**: 5 files (auth service, login screen, biometric helper, profile settings, token storage)

---

## 📋 Tóm Tắt Nhanh

**Mức độ rủi ro**: CAO ⚠️⚠️⚠️

**Tác động chính**:
- 🆕 Tính năng mới: Đăng nhập bằng Face ID/Touch ID
- ⚠️ Breaking change: Format lưu token đã thay đổi
- 🔄 Migration cần thiết: User hiện tại có thể phải đăng nhập lại

**Thời gian ước tính**:
- Sửa bugs: ~2 giờ
- Testing: ~45 phút
- Production-ready: 3-4 giờ

**Vấn đề nghiêm trọng**: 3 bugs cần sửa trước khi deploy

---

## 🎯 Tính Năng Bị Ảnh Hưởng

### 1. Đăng Nhập (NGHIÊM TRỌNG) ⚠️⚠️⚠️

**Hành động người dùng:**
- ✓ Đăng nhập email/password (vẫn hoạt động)
- 🆕 Đăng nhập bằng Face ID/Touch ID (tính năng mới)
- ⚠️ Phiên hiện tại có thể bị mất (breaking change)

**Tác động:**
Thêm option đăng nhập bằng sinh trắc học. Đăng nhập email/password vẫn hoạt động nhưng cách lưu token đã thay đổi, có thể làm mất phiên hiện tại. User có thể phải đăng nhập lại sau khi update.

**Người dùng sẽ thấy:**
- Nút "Đăng nhập bằng Face ID" mới trên màn hình login
- Prompt sinh trắc học khi tap nút
- Đăng nhập nhanh hơn (không cần gõ password)
- Có thể phải đăng nhập lại sau update app

**Breaking changes:**
- Format lưu token đã thay đổi
- Phiên hiện tại có thể bị vô hiệu
- User cần bật lại sinh trắc học sau update

---

### 2. Hồ Sơ Người Dùng (TRUNG BÌNH) ⚠️

**Hành động người dùng:**
- ✓ Xem hồ sơ (không đổi)
- ✓ Sửa hồ sơ (không đổi)
- 🆕 Bật/Tắt sinh trắc học (setting mới)

**Tác động:**
Thêm setting mới để bật/tắt xác thực sinh trắc học trong cài đặt hồ sơ.

**Người dùng sẽ thấy:**
- Toggle mới trong Settings: "Đăng nhập bằng sinh trắc học"
- Prompt xin permission khi bật lần đầu
- Có thể tắt bất cứ lúc nào

---

## 🎬 Scenarios Người Dùng

### Scenario 1: Đăng Nhập Bằng Face ID (Flow Mới)
**Khi người dùng:**
1. Mở app
2. Tap nút "Đăng nhập bằng Face ID"
3. Nhìn vào camera (Face ID) hoặc đặt ngón tay (Touch ID)

**Sẽ thấy:**
- iOS: Prompt Face ID xuất hiện
- Android: Prompt vân tay xuất hiện
- Xác thực thành công → Đăng nhập
- Xác thực thất bại → Hiện lỗi, cho thử lại hoặc dùng password

**Cần test:** NGHIÊM TRỌNG ⚠️⚠️⚠️
- Test trên cả iOS và Android
- Test khi thành công
- Test khi thất bại
- Test khi chưa đăng ký sinh trắc học
- Test khi từ chối permission

---

### Scenario 2: User Hiện Tại Mở App Sau Update
**Khi người dùng:**
1. Đã đăng nhập trên app cũ
2. Update lên version mới (có sinh trắc học)
3. Mở app

**Có thể thấy:**
- Phiên bị mất → Phải đăng nhập lại
- Hoặc: Phiên vẫn còn → Thấy option sinh trắc học mới

**Cần test:** NGHIÊM TRỌNG ⚠️⚠️⚠️
- Test migration phiên
- Test user không bị logout
- Test hiển thị option mới

---

### Scenario 3: Bật Sinh Trắc Học Trong Settings
**Khi người dùng:**
1. Vào Profile > Settings
2. Tap toggle "Đăng nhập bằng sinh trắc học"

**Sẽ thấy:**
- iOS: Prompt xin permission (nếu chưa cho)
- Android: Kiểm tra đã đăng ký vân tay chưa
- Thành công: Sinh trắc học được bật
- Thất bại: Hiện lỗi rõ ràng

**Cần test:** QUAN TRỌNG ⚠️
- Test permission flow
- Test khi chưa đăng ký sinh trắc học
- Test khi từ chối permission

---

### Scenario 4: Sinh Trắc Học Thất Bại
**Khi người dùng:**
1. Tap "Đăng nhập bằng Face ID"
2. Xác thực thất bại (sai mặt/ngón tay)

**Sẽ thấy:**
- Thông báo lỗi
- Option "Thử lại" hoặc "Dùng Password"
- Không bị kẹt màn hình

**Cần test:** QUAN TRỌNG ⚠️

---

### Scenario 5: Thiết Bị Không Hỗ Trợ
**Khi người dùng:**
1. Mở app trên thiết bị không có sinh trắc học

**Sẽ thấy:**
- Nút sinh trắc học bị ẩn
- Chỉ có option đăng nhập password
- Thông báo: "Bật Face ID trong Settings để dùng tính năng này"

**Cần test:** BÌNH THƯỜNG

---

## ⚠️ Vấn Đề Cần Sửa

### Nghiêm Trọng (3)

**1. iOS Chưa Xin Permission Đúng Cách**
- **Vị trí**: `src/utils/biometric/biometricHelper.ts:45`
- **Vấn đề**: iOS cần xin permission trong Info.plist và runtime, nhưng code chỉ check availability
- **Tác động**: Sinh trắc học sẽ fail trên iOS với lỗi "Permission denied"
- **Cách sửa**: Thêm flow xin permission cho iOS

```typescript
// Sửa:
if (Platform.OS === 'ios') {
  const permission = await Biometrics.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Cần cấp quyền sinh trắc học');
  }
}
```

---

**2. Thiếu Migration Token Storage**
- **Vị trí**: `src/services/auth/authService.ts:89`
- **Vấn đề**: Format lưu token đã đổi từ plain sang encrypted, nhưng không có logic migration
- **Tác động**: User hiện tại sẽ bị logout sau update
- **Cách sửa**: Thêm logic migration khi app start

```typescript
// Thêm migration:
async function migrateTokenStorage() {
  const oldToken = await AsyncStorage.getItem('auth_token');
  if (oldToken && !await SecureStore.getItemAsync('auth_token_encrypted')) {
    await SecureStore.setItemAsync('auth_token_encrypted', oldToken);
    await AsyncStorage.removeItem('auth_token');
  }
}
```

---

**3. Không Có Fallback Khi Sinh Trắc Học Thất Bại**
- **Vị trí**: `src/screens/Auth/LoginScreen.tsx:123`
- **Vấn đề**: Nếu sinh trắc học fail, không có option dùng password
- **Tác động**: User bị kẹt màn hình login
- **Cách sửa**: Thêm nút "Dùng Password" sau khi fail

```typescript
// Thêm fallback:
try {
  await authenticateWithBiometric();
} catch (error) {
  Alert.alert(
    'Sinh trắc học thất bại',
    'Bạn muốn dùng password thay thế?',
    [
      { text: 'Thử lại', onPress: () => retry() },
      { text: 'Dùng Password', onPress: () => showPasswordLogin() }
    ]
  );
}
```

---

### Quan Trọng (2)

**4. Android Chưa Check Đăng Ký Vân Tay**
- Có thể crash nếu user chưa đăng ký vân tay

**5. Nút Chưa Có Debouncing**
- Tap nhiều lần → Nhiều prompts

---

### Nhỏ (1)

**6. Thiếu Loading State**
- Màn hình trắng 1-2 giây khi check availability

---

## ✅ Checklist Trước Khi Deploy

### Code (NGHIÊM TRỌNG)
- [ ] Sửa iOS permission (30 phút) ⚠️⚠️⚠️
- [ ] Thêm token migration (45 phút) ⚠️⚠️⚠️
- [ ] Thêm fallback UI (20 phút) ⚠️⚠️⚠️
- [ ] Sửa Android enrollment check (15 phút)
- [ ] Thêm debouncing (10 phút)

### Test
- [ ] Test trên iPhone (iOS 15+)
- [ ] Test trên Android (Android 10+)
- [ ] Test với mạng yếu
- [ ] Test offline
- [ ] Test permission flows
- [ ] Test ảnh lớn (> 5MB)

### Regression
- [ ] Password login vẫn hoạt động
- [ ] Logout hoạt động
- [ ] Session persistence hoạt động

---

## 📊 Thống Kê

- Files: 5 thay đổi
- Rủi ro: CAO ⚠️⚠️⚠️
- Vấn đề: 6 (3 nghiêm trọng)
- Tests cần: 8 scenarios
- Thời gian sửa: ~2 giờ
- Thời gian test: ~45 phút

---

## 🚀 Bước Tiếp Theo

1. ✅ Đọc báo cáo đầy đủ
2. ⚠️ Sửa 3 vấn đề nghiêm trọng (~2 giờ)
3. ✅ Chạy tests (~45 phút)
4. ✅ Test trên thiết bị thật
5. ✅ Tạo PR với báo cáo này đính kèm

**Ước tính production-ready**: 3-4 giờ

---

**💡 Lưu ý**: Đây là thay đổi HIGH RISK. Cần test kỹ trước khi deploy!
```

---

## Key Changes

### 1. Ngôn Ngữ
- ✅ Toàn bộ tiếng Việt
- ✅ Thuật ngữ tech giữ nguyên (Face ID, Touch ID, etc.)
- ✅ Dễ hiểu cho developer Việt Nam

### 2. Structure
- ✅ **Tính năng trước** (🎯 Tính Năng Bị Ảnh Hưởng)
- ✅ **Scenarios người dùng** (🎬 Scenarios Người Dùng)
- ✅ **Vấn đề cần sửa** (⚠️ Vấn Đề Cần Sửa)
- ✅ **Chi tiết kỹ thuật sau** (📝 Files Đã Sửa)

### 3. Focus
- ✅ Tính năng và tác động lên user
- ✅ Hành động cụ thể cần làm
- ✅ Ước tính thời gian
- ✅ Priority rõ ràng

### 4. Tone
- ✅ Thân thiện, dễ hiểu
- ✅ Actionable (có thể hành động ngay)
- ✅ Emoji để dễ scan
- ✅ Checklist để track progress
