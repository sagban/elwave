import logging
import json
import azure.functions as func
from Utils.utils import *

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    try:
        base64img = req_body.get('image')
        image = readb64(base64img)
        image = imutils.resize(image, width=250)
        skin = extractSkin(image)
        dominantColors = extractDominantColor(skin,hasThresholding=True)
        tone = tone_code(dominantColors)
        tone = [round(x) for x in tone]
        skin_tone = identify_skin_tone(tone)
        return func.HttpResponse(
            json.dumps({"skintone":skin_tone}),
            mimetype='application/json',
            status_code=200
        )
    except Exception as e:
        return func.HttpResponse (
             f"Internal Error Occured: {e}",
             status_code=500
        )
