"""Loads variables from Default and config_local.py and returns them as a class instance."""


class Configuration(object):
    def __init__(self):
        self.load(Default)

        try:
            import config_local
            self.load(config_local)
        except ImportError:
            pass


    def load(self, module):
        """Loads variables from a module or class"""
        for k in module.__dict__.keys():
            if not k.startswith('__'):
                setattr(self, k, module.__dict__[k])


class Default(object):
    APP_NAME = 'talk'
    GITHUB_ORGANIZATION = 'jonathanmarmor'
    URL = 'talk.jonath.in'
    DEBUG = False


CONF = Configuration()
