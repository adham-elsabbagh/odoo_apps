# -*- coding: utf-8 -*-
import logging

from odoo import http
from odoo.http import request
from odoo.addons.website.controllers.main import Website
import requests

logger = logging.getLogger(__name__)


class WebsiteReload(Website):

    @http.route('/server-not-found', type='http', auth="public", website=True)
    def reload(self, **kw):
        not_found_host = not_found_scheme = not_found_server = None
        # url = request.httprequest.headers.get('Referer')
        url = request.httprequest.url
        query = requests.utils.urlparse(url).query
        params = dict(x.split('=') for x in query.split('&'))
        if 'not_found_host' in params and 'not_found_scheme' in params and \
                'not_found_server' in params:
            not_found_host = params['not_found_host']
            not_found_scheme = params['not_found_scheme']
            not_found_server = params['not_found_scheme']
        values = {
            'not_found_host': not_found_host,
            'not_found_scheme': not_found_scheme,
            'not_found_server': not_found_server
        }
        return request.render("redirect_page.404_custom", values)
