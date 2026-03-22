import { render } from "@react-email/render";

import ModernPromo from "../emails/Promo/ModernPromo.jsx";
import WeeklyNews from "../emails/Newsletter/WeeklyNews.jsx";
import WelcomeEmail from "../emails/Transactional/WelcomeEmail.jsx";

export const renderTemplate = (templateKey, variables) => {
  switch (templateKey) {
    case "modern-promo":
      return render(<ModernPromo {...variables} />);

    case "weekly-news":
      return render(<WeeklyNews {...variables} />);

    case "welcome-email":
      return render(<WelcomeEmail {...variables} />);

    default:
      throw new Error("Template not found");
  }
};
