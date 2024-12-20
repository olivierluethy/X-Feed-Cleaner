let counter = 0;

function autoClickOnce() {
  /* https://www.blackbox.ai/share/828f1eb9-701d-44b7-a0cf-e922ef31b081 */
  // Suche das div mit role="tablist" und data-testid="ScrollSnap-List"
  const tablist = document.querySelector(
    'div[role="tablist"][data-testid="ScrollSnap-List"]'
  );

  if (tablist) {
    // Suche das zweite div mit role="presentation" innerhalb des tablist
    const presentationDivs = tablist.querySelectorAll(
      'div[role="presentation"]'
    );
    if (presentationDivs.length > 1) {
      const secondPresentationDiv = presentationDivs[1];

      // Suche das <a> Element innerhalb des zweiten presentation div
      const anchor = secondPresentationDiv.querySelector(
        'a[role="tab"][href="/home"]'
      );
      if (anchor && counter == 0) {
        // Klicke auf das <a> Element
        anchor.click();
        counter++;
      }
    }
  }
}
