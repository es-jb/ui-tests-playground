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
