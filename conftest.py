import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture(scope="session", autouse=True)
def browser():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")

    s = Service(ChromeDriverManager().install())
    browser = webdriver.Chrome(service=s, options=options)

    yield browser

    browser.quit()


def pytest_addoption(parser):
    parser.addoption("--base-url", action="store", default="http://localhost:3000")


@pytest.fixture(scope="session", autouse=True)
def base_url(request):
    return request.config.getoption("--base-url")


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    if rep.when == "call" and rep.failed:
        driver = item.funcargs.get("browser")
        if driver:
            # Capture screenshot and HTML DOM
            screenshot = driver.get_screenshot_as_base64()
            dom = driver.page_source
            # Attach to report
            item.user_properties.append(("html_dom", dom))
            item.user_properties.append(("screenshot", screenshot))
