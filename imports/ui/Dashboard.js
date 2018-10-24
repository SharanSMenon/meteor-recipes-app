import React from 'react';

import PrivateHeader from './PrivateHeader';
import RecipeList from './RecipesList';
import Editor from './Editor'
import { Recipes } from '../api/recipes';

export default () => (
    <div>
        <PrivateHeader title="Recipes"/>
        <div className="page-content">
            <div className="page-content__sidebar">
                <RecipeList/>
            </div>      
            <div className="page-content__main">
                <Editor />
            </div>
        </div>
    </div>
)