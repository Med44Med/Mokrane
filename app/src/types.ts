type UserType = {
  id: string;
  created_at: Date;
  email: string;
  firstname: string;
  lastname: string;
  tel?: string;
  class: string;
  branch: string;
  sexe?: string;
  avatar?: string;
};

type LessonType = BrochureType & {
  content: string;
};

type BrochureType = {
  id: string;
  created_at: string;
  title: string;
  description?: string;
  content: string;
  price: number;
  views: number;
  thumbnail: string;
  class: string;
  branch: string;
};

type OrderType = {
  orderNo: string | null;
  user: string | null;
  items: BrochureType[];
  coupon: string | null;
  total: number;
};

export type { UserType, LessonType, BrochureType, OrderType };
