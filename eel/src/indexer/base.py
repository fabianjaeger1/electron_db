import abc
import eel

@eel.expose
def test(string):
    print("Test")

class BaseContentScanner(abc.ABC):
    def __init__(self):
        ...

    @abc.abstractmethod
    def get_text_content(self) -> str:
        ...
