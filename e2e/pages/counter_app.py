from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver


class CounterPage:
    COUNTER_VALUE = (By.ID, "counter")
    PLUS_BUTTON = (By.XPATH, "//button[text()='+']")
    MINUS_BUTTON = (By.XPATH, "//button[text()='-']")

    def __init__(self, driver: WebDriver):
        self.driver = driver

    def load(self, url):
        self.driver.get(url)

    def get_counter_value(self):
        return int(self.driver.find_element(*self.COUNTER_VALUE).text)

    def click_plus(self):
        self.driver.find_element(*self.PLUS_BUTTON).click()

    def click_minus(self):
        self.driver.find_element(*self.MINUS_BUTTON).click()
