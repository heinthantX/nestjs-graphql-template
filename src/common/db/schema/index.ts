import * as userSchema from '../../../user/schema';
import * as authSchema from '../../../auth/schema';

export default {
  ...userSchema,
  ...authSchema,
};
