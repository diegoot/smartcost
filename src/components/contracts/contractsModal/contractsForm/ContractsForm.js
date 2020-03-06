import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, DatePicker, Select, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { DATE_FORMAT, CONTRACT_STATUS_LABELS } from '../../../../constants'
import contractsActions from '../../../../redux/actions/contracts'

import styles from './ContractsForm.module.scss'

const { Option } = Select
const FORM_ITEM_WIDTH = 250

const ContractsForm = props => {
  const dispatch = useDispatch()
  const { contracts, contractors, provinces } = useSelector(state => ({
    contracts: state.contracts,
    contractors: state.contractors,
    provinces: state.provinces
  }))
  const isNewContract = !contracts.selected
  const onFinish = formValues => {
    const actionFn = isNewContract
      ? contractsActions.saveContract
      : contractsActions.updateContract
    const values = isNewContract
      ? formValues
      : { ...formValues, id: contracts.selected.id }
    dispatch(actionFn(values))
    props.onSave()
  }
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      nroContrato: (contracts.selected && contracts.selected.nroContrato) || '',
      fechaInicio:
        (contracts.selected &&
          contracts.selected.fechaInicio &&
          moment(contracts.selected.fechaInicio)) ||
        '',
      montoBase: (contracts.selected && contracts.selected.montoBase) || '',
      contratistaId:
        (contracts.selected && contracts.selected.contratistaId) || '',
      provinciaId: (contracts.selected && contracts.selected.provinciaId) || '',
      estado: (contracts.selected && contracts.selected.estado) || ''
    })
  }, [contracts.selected, form])

  return (
    <div className={styles.container}>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={{
          nroContrato:
            (contracts.selected && contracts.selected.nroContrato) || ''
        }}>
        <Form.Item
          name="nroContrato"
          label="Número"
          style={{ width: FORM_ITEM_WIDTH }}
          rules={[
            {
              required: true,
              message: 'Por favor ingresá un número de contrato'
            }
          ]}>
          <Input />
        </Form.Item>
        {!isNewContract && (
          <Form.Item name="estado" label="Estado">
            <Select style={{ width: FORM_ITEM_WIDTH }}>
              {Object.keys(CONTRACT_STATUS_LABELS).map(s => (
                <Option value={+s} key={+s}>
                  {CONTRACT_STATUS_LABELS[+s]}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="fechaInicio"
          label="Inicio"
          rules={[
            {
              required: true,
              message: 'Por favor seleccioná una fecha de inicio'
            }
          ]}>
          <DatePicker onChange={() => null} format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item
          name="montoBase"
          label="Monto base"
          style={{ width: FORM_ITEM_WIDTH }}
          rules={[{ required: true, message: 'Por favor ingresá un monto' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="contratistaId"
          label="Contratista"
          rules={[
            { required: true, message: 'Por favor seleccioná un contratista' }
          ]}>
          <Select style={{ width: FORM_ITEM_WIDTH }}>
            <Option value="-1">Seleccioná contratista</Option>
            {contractors.items.map(c => (
              <Option value={c.id} key={c.id}>
                {c.razonSocial}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="provinciaId"
          label="Provincia"
          rules={[
            { required: true, message: 'Por favor seleccioná una provincia' }
          ]}>
          <Select defaultValue="-1" style={{ width: FORM_ITEM_WIDTH }}>
            <Option value="-1">Seleccioná provincia</Option>
            {provinces.items.map(p => (
              <Option value={p.id} key={p.id}>
                {p.nombre}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

ContractsForm.propTypes = {
  onSave: PropTypes.func.isRequired
}

export default ContractsForm
