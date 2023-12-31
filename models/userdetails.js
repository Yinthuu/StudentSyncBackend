const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userdetailsSchema = new Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_status: { type: Boolean,  default: false, required: true },
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution' },
    city: { type: String},
    province: { type: String},
    country: { type: String},
    postal_code: { type: String},
    mobile_number: { type: String},
    student_id_img_name: String,
    profile_img_name: String,
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    notificationToken: {type: String}
  }, { timestamps: true });
  

// Hash password before saving
userdetailsSchema.pre('save', async function(next) {
  const userdetails = this;
  if (userdetails.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    userdetails.password = await bcrypt.hash(userdetails.password, salt);
  }
  this.email = this.email.toLowerCase();
  next();
});

userdetailsSchema.index({ location: "2dsphere" });
const Userdetails = mongoose.model('Userdetails', userdetailsSchema);

module.exports = Userdetails;