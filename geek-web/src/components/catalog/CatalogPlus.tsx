import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHttp } from '../../hooks/http.hook'
import { addCatalog } from '../../redux/actions/catalog'
import { Catalog } from '../../types'
import { RCard } from '../card/RCard'
import { RCardAction } from '../card/RCardAction'
import { RCardContent } from '../card/RCardContent'
import { RCardTitle } from '../card/RCardTitle'
import { RChip } from '../parts/RChip'

export const CatalogPlus: React.FC = () => {
  const dispatch = useDispatch()
  const initForm = {
    name: '',
    description: '',
    link: ''
  }
  const chipsInit: string[] = []
  const [form, setForm] = useState({ ...initForm })
  const [chips, setChips] = useState(chipsInit)
  const [tmpChip, setTmpChip] = useState('')
  const changeHandler = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const { request } = useHttp()
  const onPlus = async () => {
    const data: Catalog = await request('/api/catalog/create', 'POST', {
      ...form,
      tags: chips
    })
    if (!!data) {
      dispatch(addCatalog(data))
      setForm({ ...initForm })
    }
  }
  const onAddChip = () => {
    const some: boolean = chips.some((item) => item === tmpChip)
    if (tmpChip && !some) {
      setChips([...chips, tmpChip])
    }
    setTmpChip('')
  }
  const inputTmpChip = (event: any) => {
    setTmpChip(event.target.value)
  }
  const onCloseChip = (position: number) => () => {
    setChips(chips.filter((item, index) => index !== position))
  }
  return (
    <RCard>
      <RCardTitle>Create Catalog</RCardTitle>
      <RCardContent>
        <div className="input-field mb-1">
          <input
            id="name"
            name="name"
            type="text"
            className="validate"
            onChange={changeHandler}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field mb-1">
          <input
            id="description"
            name="description"
            type="text"
            className="validate"
            onChange={changeHandler}
          />
          <label htmlFor="description">Description</label>
        </div>
        <div className="input-field mb-1">
          <input
            id="link"
            name="link"
            type="text"
            className="validate"
            onChange={changeHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
        <div>
          <div className="d-flex align-center">
            <input type="text" value={tmpChip} onChange={inputTmpChip} />
            <button className="btn btn-small blue" onClick={onAddChip}>
              Tag
            </button>
          </div>
          <div>
            {chips.map((item, index) => (
              <RChip
                key={item}
                text={item}
                close={true}
                onClose={onCloseChip(index)}
              />
            ))}
          </div>
        </div>
      </RCardContent>
      <RCardAction>
        <button className="btn" onClick={onPlus}>
          Save
        </button>
      </RCardAction>
    </RCard>
  )
}
