import React from 'react';
import { connect } from 'react-redux';
import { getCategories, getActieCategoryId } from '../../selectors';
import { Link, withRouter } from 'react-router';
import { compose } from 'redux';
import classNames from 'classnames';
import R from 'ramda';

const Categories = ({ categories, activeCategoryId }) => {

    const renderCategory = (category, index) => {    
        const getActiveState = R.propEq('id', activeCategoryId);
        const linkClass = classNames({
            'list-group-item': true,
            'active': getActiveState(category)
        })   

        return (
            <Link
                to={`/categories/${category.id}`}
                className={linkClass}
                key={index}
            >
            {category.name}
            </Link>
        )
    }

    const renderAllCategory = () => {
        const linkClass = classNames({
            'list-group-item': true,
            'active': R.isNil(activeCategoryId)
        })

        return (
            <Link
                to="/"
                className={linkClass}
            >All</Link>
        )
    }

    return (        
        <div className="well">
            <h4>Brand</h4>
            <div className="list-group">
                {renderAllCategory()}
                {categories.map((category, index) => renderCategory(category, index))}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({    
    categories: getCategories(state),
    activeCategoryId: getActieCategoryId(ownProps)
})

//export default connect(mapStateToProps)(Categories);

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Categories)