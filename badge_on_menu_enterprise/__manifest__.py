# -*- coding: utf-8 -*-

{
    'name': 'Notification Badges on Menu apps',
    'category': 'Productivity',
    'version': '12.0.0.0.1',
    'summary': "Add Badges for menu apps",
    'author': 'Adham',
    'depends': ['web_enterprise', 'mail'],
    'images': ['images/screen_shoot.png'],
    'auto_install': True,
    "installable": True,
    "application": True,
    'data': ['views/webclient_templates.xml'],
    'qweb': ["static/src/xml/*.xml"],
    'license': 'LGPL-3',
    'price': 10.0,
    'currency': 'EUR',
}
