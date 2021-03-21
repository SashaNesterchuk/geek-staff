import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHttp } from '../../hooks/http.hook'
import { addCatalog } from '../../redux/actions/catalog'
import { Catalog } from '../../types'
export const CatalogPlus = () => {
  const dispatch = useDispatch()
  const initForm = {
    name: '',
    description: '',
    link: ''
  }
  const [form, setForm] = useState({ ...initForm })

  const changeHandler = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const { request, error } = useHttp()
  const onPlus = async () => {
    const data: Catalog = await request('/api/catalog/create', 'POST', {
      ...form
    })
    if (!!data) {
      dispatch(addCatalog(data))
      setForm({ ...initForm })
    }
  }
  return (
    <div className="col m3">
      <div className="card">
        <div className="card-content">
          <div className="input-field">
            <input
              id="name"
              name="name"
              type="text"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input
              id="description"
              name="description"
              type="text"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="input-field">
            <input
              id="link"
              name="link"
              type="text"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="link">Link</label>
          </div>
        </div>
        <div className="card-action">
          <button className="btn" onClick={onPlus}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
