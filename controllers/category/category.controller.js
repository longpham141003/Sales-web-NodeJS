import Category from '../../models/category/category.model.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();  
        return res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh mục' });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);  
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }
        return res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh mục' });
    }
};

export const createCategory = async (req, res) => {
  try {
      const { name } = req.body;
      const image = req.file ? req.file.path : null; 

      if (!name || !image) {
          return res.status(400).json({ message: 'Tên và ảnh của danh mục là bắt buộc.' });
      }

      const lastCategory = await Category.findOne().sort({ categoryId: -1 }).exec();
      let newCategoryId = 'DM001';

      if (lastCategory) {
          const lastId = lastCategory.categoryId;
          const lastNumber = parseInt(lastId.slice(2), 10);
          newCategoryId = `DM${String(lastNumber + 1).padStart(3, '0')}`;
      }

      const newCategory = new Category({
          categoryId: newCategoryId,
          name,
          image 
      });

      const savedCategory = await newCategory.save();
      return res.status(201).json({
          message: 'Danh mục đã được tạo thành công',
          category: savedCategory
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi tạo danh mục' });
  }
};


export const updateCategory = async (req, res) => {
  try {
      const { name } = req.body;
      const image = req.file ? req.file.path : null; 

      const category = await Category.findById(req.params.id);
      if (!category) {
          return res.status(404).json({ message: 'Danh mục không tồn tại' });
      }

      category.name = name || category.name;
      category.image = image || category.image; 

      const updatedCategory = await category.save();
      return res.status(200).json({
          message: 'Danh mục đã được cập nhật thành công',
          category: updatedCategory
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi cập nhật danh mục' });
  }
};


export const deleteCategory = async (req, res) => {
  try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
          return res.status(404).json({ message: 'Danh mục không tồn tại' });
      }

      return res.status(200).json({ message: 'Danh mục đã được xóa thành công' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi xóa danh mục' });
  }
};

