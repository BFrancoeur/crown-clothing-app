import { Outlet } from 'react-router-dom';

import CategoryItem from '../category-item/category-item.component';

import './categories-archive.styles.scss';

  const CategoriesArchive = ({ categories }) => {

    return(

        <div className="categories-container">

          {categories.map((category) =>(

            <CategoryItem key={category.id} category={category} />

          ))}

        </div>
    );
  }

  export default CategoriesArchive;