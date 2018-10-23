import React from 'react';

import PrivateHeader from './PrivateHeader';
import RecipeList from './RecipesList';
import { Recipes } from '../api/recipes';

export default () => (
    <div>
        <PrivateHeader title="Recipes"/>
        <div className="page-content">
            <RecipeList />
        </div>
    </div>
)