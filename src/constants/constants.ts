import { HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

export const CsrfToken = 'x-csrf-token';

export const SAMPLE_EMAIL = 'Myemail@domain.com';
export const SAMPLE_PASSWORD = 'Mypassword123';

export const SAMPLE_PHONE = '9898989898';

export const SAMPLE_ADDRESS = '29 Washington Pl, New York';

export const SAMPLE_ZIPCODE = '75001';

export const SAMPLE_CITY = 'Dallas';

export const SAMPLE_STATE = 'Texas';

export const SAMPLE_STREET = 'AMLI 7th Street';

export const SAMPLE_NAME = 'Jane Doe';

export const SAMPLE_FIRST_NAME = 'Jane';

export const SAMPLE_MIDDLE_NAME = 'J';

export const SAMPLE_LAST_NAME = 'Doe';

export const SAMPLE_INT = 13;

export const SAMPLE_STRING = 'SAMPLE';

export const MAX_PRICE_VALUE = 9999999;

export const SAMPLE_PRODUCT_SHIP_TO = 'Individual';

export const SAMPLE_PRODUCT_SHIPPING = 'Standard';

export const SAMPLE_DECIMAL = 12.34;

export const SAMPLE_DESCRIPTION = 'This is a description message';

export const SAMPLE_TYPE = 'Account';

export const SAMPLE_STORE_STATUS = 'Active';

export const SAMPLE_URL_PATH = 'url-path';

export const SAMPLE_UUID = randomUUID();

export const SAMPLE_COLOR = '000000';

export const SAMPLE_COLOR_HEX_CODE = '#000000';

export const SAMPLE_STATUS = 'Active';

export const SAMPLE_BANK_ACCOUNT_NUMBER = '091000019';

export const SAMPLE_BANK_ROUTING_NUMBER = '011401533';

export const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJBY3RpdmUiLCJwcm9ncmFtSWQiOm51bGwsInBlcm1pc3Npb25MaXN0IjpbIlBDIiwiUEYiLCJQUCIsIlBTIiwiU0EiLCJTTyIsIlNEIiwiU1IiLCJTUCJdLCJzdWIiOiI2NzU0MTFGOC1DOTMxLTRGMDQtQTZCQS02OUE2NTY1Nzk0OEUiLCJpYXQiOjE2NzA2OTE3NTEsImV4cCI6MTY3MDY5ODk1MX0.4zRehlOD615AtNuQSZiuvEUm5psXP5bY9IbtXyC5nKk';

export const FILE_FIELD_NAME = 'file';

export const FILES_FIELD_NAME = 'files';

export const SAMPLE_USER_ID = randomUUID();

export const SAMPLE_FILE_MIMETYPE = 'image/jpeg';

export const SAMPLE_FILE_TYPE = 'image';

export const SAMPLE_FILE_EXTENSION = 'jpeg';

export const SAMPLE_FILE_NAME = 'filename.jpeg';

export const SAMPLE_FILE_SIZE = 11702;

export const SAMPLE_FILE_ENCODING = '7bit';

export const SAMPLE_FILE_S3_KEY = 'local/filename.jpeg';

export const SAMPLE_FILE_METADATA_RATIO = 0.34;

export const SAMPLE_ERROR_MSG = 'Cart Item Quantity More Than Inventory Count';

export const SAMPLE_ROLE = 'admin';

export const SAMPLE_MEDIA_FILE_METADATA = {
  ratio: SAMPLE_FILE_METADATA_RATIO,
  mimeType: SAMPLE_FILE_MIMETYPE,
  fileSize: SAMPLE_FILE_SIZE,
};

export const SAMPLE_BOOL = true;

export const SAMPLE_DATE = '2023-02-22';

export const SAMPLE_TIMESTAMPTZ = '2023-02-22T16:30:40.260Z';

export const SAMPLE_HTTP_STATUS = HttpStatus.OK;

export const SAMPLE_MESSAGE = `Success`;

export const SAMPLE_TOTAL = 0;

export const SAMPLE_ID = '1234567';

export const SAMPLE_OBJECT = { key: 'value' };

export const SAMPLE_ARRAY = [{ key: 'value' }];

export const SAMPLE_API_STATUS = 'Api status running!';

export const ResumeDb = 'resumeDb';

export const DashboardDb = 'dashboardDb';

export const SAMPLE_URL = 'https://example.com';

export const SAMPLE_JWT_EXPIRE = Date.now();
