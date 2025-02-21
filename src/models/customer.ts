import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  customerId: string;
  formData: {
    vehicleData: {
      make: string;
      model: string;
      year: number;
      vin: string;
      hsnTsn: string;
      licensePlate: string;
      firstRegistration: string;
      firstRegistrationOwner: string;
      currentMileage: string;
    };
    driverInfo: {
      name: string;
      dob: string;
      licenseNumber: string;
      maritalStatus: string;
    };
    insuranceWishes: {
      coverageType: string;
      deductible: number;
      insuranceStart: string;
    };
    personalData: {
      email: string;
      phone: string;
      address: string;
      street: string;
      houseNumber: string;
      postalCode: string;
      city: string;
    };
    paymentInfo: {
      iban: string;
    };
    guid: string;
  };
}

const CustomerSchema: Schema = new Schema({
  customerId: { type: String, required: true, unique: true },
  formData: {
    vehicleData: {
      make: { type: String },
      model: { type: String },
      year: { type: Number },
      vin: { type: String },
      hsnTsn: { type: String },
      licensePlate: { type: String },
      firstRegistration: { type: String },
      firstRegistrationOwner: { type: String },
      currentMileage: { type: String }
    },
    driverInfo: {
      name: { type: String },
      dob: { type: String },
      licenseNumber: { type: String },
      maritalStatus: { type: String }
    },
    insuranceWishes: {
      coverageType: { type: String },
      deductible: { type: Number },
      insuranceStart: { type: String }
    },
    personalData: {
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      street: { type: String },
      houseNumber: { type: String },
      postalCode: { type: String },
      city: { type: String }
    },
    paymentInfo: {
      iban: { type: String }
    },
    guid: { type: String }
  }
  }, {
    versionKey: false, // This option prevents mongoose from adding __v field
  });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
