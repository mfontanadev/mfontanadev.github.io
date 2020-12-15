function CategoryService() 
{
}

CategoryService.WSGetSubcategoriesFromCategory = function(_idCategory) 
{
    var array = new Array();

    // Iterate over all spents.
    appSession().m_arrSubCategory.forEach(eSubCategory => 
    {
        // JOIN spent.categoryId with category.id
        if (_idCategory === eSubCategory.getCategoryId())
        {
            array.push(eSubCategory);
        }
    });

    return array;
}
