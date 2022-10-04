import answerPage from "./answerPage";
import answerHTML from "./answerHTML";

interface Item {
  id: string | number;
  pinned: boolean;
  q: string;
  a_text?: string;
  a_html?: answerHTML;
  a_page?: answerPage;
}

export default Item;
