const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports',
        'Books',
        'Toys',
        'Health & Beauty',
        'Automotive',
        'Other',
      ],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 20;
        },
        message: 'A product cannot have more than 20 tags',
      },
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300x300?text=No+Image',
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
productSchema.index({ category: 1, price: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
