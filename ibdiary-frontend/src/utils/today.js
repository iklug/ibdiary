import { format } from "date-fns";

const today = () => {
  const date = new Date();
  const formatDate = format(date, "yyyy-MM-dd");
  const day = date.getDay();

  return [formatDate, day];
};

export default today;
