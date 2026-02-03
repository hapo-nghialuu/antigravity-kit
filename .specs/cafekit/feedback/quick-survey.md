# CafeKit Spec v0.1.0 - Quick Survey

**Estimated Time:** 2 minutes  
**Distribution:** Day 5 (Week 1)  
**Channel:** Slack DM + Email  
**Anonymous:** Yes (Google Forms)  
**Target Response Rate:** 60%+ (9+ out of 15 users)  

---

## Survey Introduction

> Cảm ơn bạn đã dùng thử CafeKit Spec v0.1.0! 
> 
> Survey này chỉ mất 2 phút và sẽ giúp chúng tôi cải tiến v0.2.0.
> 
> Tất cả phản hồi đều ẩn danh và rất quý giá.

---

## Question 1: Installation Experience

**Cài đặt CafeKit Spec dễ dàng như thế nào?**

- [ ] 5 ⭐ - Hoàn hảo, không có vấn đề gì
- [ ] 4 ⭐ - Một chút bối rối nhưng vẫn hoạt động
- [ ] 3 ⭐ - Gặp một số lỗi nhưng đã giải quyết được
- [ ] 2 ⭐ - Nhiều lỗi, khó cài đặt
- [ ] 1 ⭐ - Không thể cài đặt được

**Nếu gặp lỗi, vui lòng mô tả ngắn gọn:** (Optional)
\`\`\`
_______________________________________________
\`\`\`

---

## Question 2: Command Usage

**Bạn đã sử dụng command nào? (Chọn tất cả)**

- [ ] \`/spec-init\` - Initialize spec document
- [ ] \`/spec-requirements\` - Define requirements
- [ ] \`/spec-design\` - System design
- [ ] \`/spec-tasks\` - Task breakdown
- [ ] \`/spec-impl\` - Implementation spec
- [ ] \`/spec-status\` - Status tracking
- [ ] Chưa dùng command nào (chỉ cài đặt thôi)

---

## Question 3: Biggest Pain Point

**Vấn đề LỚN NHẤT bạn gặp phải khi dùng CafeKit Spec là gì?**

(Mô tả ngắn gọn trong 1-2 câu, tối đa 50 từ)

\`\`\`
_______________________________________________
_______________________________________________
_______________________________________________
\`\`\`

---

## Question 4: Most Wanted Feature

**Tính năng nào sẽ giúp bạn NHIỀU NHẤT?** (Chọn 1)

- [ ] Thông báo lỗi rõ ràng hơn (better error messages)
- [ ] Cài đặt nhanh hơn (faster installation)
- [ ] Nhiều ví dụ hơn trong docs (more examples)
- [ ] Tùy chỉnh workflows (customize workflows)
- [ ] Cập nhật dễ dàng (easy updates)
- [ ] Chọn platform thủ công (--platform flag)
- [ ] Chế độ verbose/debug (troubleshooting mode)
- [ ] Khác: ______________________________

---

## Question 5: Recommendation Score (NPS)

**Bạn có khả năng giới thiệu CafeKit Spec cho đồng nghiệp không?**

(0 = Không bao giờ, 10 = Chắc chắn sẽ giới thiệu)

\`\`\`
0  1  2  3  4  5  6  7  8  9  10
◯  ◯  ◯  ◯  ◯  ◯  ◯  ◯  ◯  ◯  ◯
\`\`\`

**Tại sao?** (Optional, 1-2 câu)
\`\`\`
_______________________________________________
\`\`\`

---

## Question 6: Overall Satisfaction

**Tổng thể, bạn hài lòng với CafeKit Spec như thế nào?**

- [ ] 5 ⭐ - Rất hài lòng, đúng những gì tôi cần
- [ ] 4 ⭐ - Hài lòng, nhưng có thể cải thiện
- [ ] 3 ⭐ - Trung bình, có tốt có xấu
- [ ] 2 ⭐ - Không hài lòng, nhiều vấn đề
- [ ] 1 ⭐ - Rất không hài lòng

---

## Bonus: Open Feedback (Optional)

**Bạn có gì muốn chia sẻ thêm không?**

(Ý kiến, góp ý, hoặc bất kỳ điều gì khác)

\`\`\`
_______________________________________________
_______________________________________________
_______________________________________________
\`\`\`

---

## Survey Distribution Message

### Slack DM Template

\`\`\`
Hey [Name]! 👋

Cảm ơn bạn đã dùng thử CafeKit Spec tuần này!

Tôi có một survey cực ngắn (2 phút) để cải thiện v0.2.0:
[Google Forms Link]

Mọi phản hồi đều vô cùng quý giá và hoàn toàn ẩn danh.

Thanks! 🙏
\`\`\`

### Email Subject

\`\`\`
[CafeKit Spec] Quick Survey (2 min) - Help shape v0.2.0
\`\`\`

### Email Body

\`\`\`
Hi [Name],

Cảm ơn bạn đã dùng thử CafeKit Spec v0.1.0!

Tôi muốn nghe ý kiến của bạn để cải thiện v0.2.0. Survey này chỉ mất 2 phút và hoàn toàn ẩn danh.

📋 Survey Link: [Google Forms]

Phản hồi của bạn sẽ giúp chúng tôi:
- Sửa các vấn đề bạn gặp phải
- Ưu tiên tính năng bạn cần nhất
- Cải thiện trải nghiệm sử dụng

Deadline: EOD Friday (Day 5)

Cảm ơn rất nhiều!

Best,
Nghia Luu
Product Owner - CafeKit Spec
\`\`\`

---

## Analysis Guidelines

### NPS Score Calculation

\`\`\`
Promoters (9-10): ______ users
Passives (7-8):   ______ users
Detractors (0-6): ______ users

NPS = (% Promoters) - (% Detractors)

Example:
7 promoters, 2 passives, 1 detractor out of 10 responses
NPS = (70%) - (10%) = 60 (Excellent)
\`\`\`

### Pain Point Categorization

Categorize open-ended responses into:
- **Installation Issues:** Platform detection, file conflicts, etc.
- **Workflow Confusion:** Unclear docs, command order, etc.
- **Feature Gaps:** Missing functionality
- **Performance:** Slow installation, etc.
- **Other**

### Feature Request Prioritization

Calculate % of users requesting each feature:
\`\`\`
Feature X: [Count] / [Total Responses] = [%]
\`\`\`

Sort by % descending → Top 3 become P0 candidates for v0.2.0.

---

## Success Criteria

- ✅ **Response Rate:** ≥9 responses (60%)
- ✅ **NPS Score:** >0 (more promoters than detractors)
- ✅ **Satisfaction:** Average ≥3.5/5
- ✅ **Pain Points:** At least 5 unique issues identified
- ✅ **Feature Clarity:** Top 3 features clearly requested

---

## Next Steps After Survey

1. ✅ Analyze responses (Day 6)
2. ✅ Identify top 3 pain points
3. ✅ Calculate NPS and satisfaction scores
4. ✅ Prepare interview questions based on survey insights
5. ✅ Share preliminary findings in #cafekit-support

---

**Distribution Date:** Day 5 (Friday, Week 1)  
**Analysis Date:** Day 6 (Saturday, Week 1)  
**Format:** Google Forms (anonymous)  
**Owner:** Nghia Luu  
