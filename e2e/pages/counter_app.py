from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver


class CounterPage:
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.counter_value = (By.ID, "counter")
        self.plus_button = (By.XPATH, "//button[text()='+']")
        self.minus_button = (By.XPATH, "//button[text()='-']")

    def load(self, url):
        self.driver.get(url)

    def get_counter_value(self):
        return int(self.driver.find_element(*self.counter_value).text)

    def click_plus(self):
        self.driver.find_element(*self.plus_button).click()

    def click_minus(self):
        self.driver.find_element(*self.minus_button).click()
