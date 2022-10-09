import type { Router, Route } from "vue-router";
import { ref, type Ref } from "vue";
import type Item from "../../faqelize/types/item";

function SubPage({
  subPage,
  router,
  route,
}: {
  subPage: Ref;
  router: Router;
  route: Route;
}) {
  const opened_page = ref("");
  const page_title = ref("");

  const openItem = (item: Item): void => {
    if (!item.a_page) return;
    opened_page.value = item.a_page.page.toString();
    if (subPage.value) subPage.value.open();
    page_title.value = item.q;
    const query = Object.assign({}, route.query);
    if (query.q != item.id) {
      query.q = item.id.toString();
      router.replace({ query });
    }
  };

  const subPageClosed = () => {
    const query = Object.assign({}, route.query);
    delete query.q;
    router.replace({ query });
  };

  return {
    opened_page,
    page_title,
    openItem,
    subPageClosed,
  };
}

export default SubPage;
