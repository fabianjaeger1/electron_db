import eel

eel.init('web')


def read_query():
    print("test")

@eel.expose
def return_string(string):
    print(string)


# eel.start('frontend/index.html')
# eel.browsers.set_path('electron', 'node_modules/electron/dist/electron')
eel.start('frontend/index.html', mode='electron')
