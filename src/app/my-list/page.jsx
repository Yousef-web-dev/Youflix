'use client';

import dynamic from 'next/dynamic';

// بنخلي الصفحة كلها تترند من جهة المتصفح فقط وتلغي الـ Prerendering تماماً
const MyListContent = dynamic(
  () => import('../../components/my-list/MyListMainContent'), 
  { ssr: false }
);

export default function MyListPage() {
  return <MyListContent />;
}