function isStandalone() {
  type navigatorWithSafari = Navigator & {
    standalone: boolean | undefined;
  };
  const navigator: navigatorWithSafari = {
    standalone: undefined,
    ...window.navigator,
  };
  const isStandalone = navigator.standalone;
  return isStandalone;
}

export default isStandalone;
