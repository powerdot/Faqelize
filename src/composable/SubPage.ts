import { useRouter, useRoute } from "vue-router";
import { ref, type Ref } from "vue";
import type Item from "../../faqelize/types/item";

function SubPage({ subPage }: { subPage: Ref }) {
  const pageToOpen = ref("");
  const pageTitle = ref("");
  const router = useRouter();
  const route = useRoute();

  const openItem = (item: Item): void => {
    if (!item.a_page) return;
    pageToOpen.value = item.a_page.page.toString();
    if (subPage.value) subPage.value.open();
    pageTitle.value = item.q;
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
    pageToOpen,
    pageTitle,
    openItem,
    subPageClosed,
  };
}

export default SubPage;
