import ActionsCreators from './../actionsCreators'

import { put } from 'redux-saga/effects'

import axios from 'axios'

export function* getReport(action) {

    try {
        const reportId = action.report;
        const data = yield axios.get('https://infinite-basin-82984.herokuapp.com/reports/' + reportId)

        yield put(ActionsCreators.getReportSuccess(data.data))

    } catch (err) {
        yield put(ActionsCreators.getReportFailure())
    }
}

export function* getReports() {
    try {
        const data = yield axios.get('https://infinite-basin-82984.herokuapp.com/reports')
        yield put(ActionsCreators.getReportsSuccess(data.data.reports))
    } catch (err) {
        yield put(ActionsCreators.getReportsFailure())
    }
}

export function* createReport(action) {

    let report = action.report;

    try {
        const data = yield axios.post('https://infinite-basin-82984.herokuapp.com/reports', report)
        yield put(ActionsCreators.createReportSuccess(data.data))
    } catch (err) {
        yield put(ActionsCreators.createReportFailure())
    }
}

export function* updateReport(action) {
    try {

        let reportId = action.report.reportId;

        let report = action.report;

        const data = yield axios.put('https://infinite-basin-82984.herokuapp.com/reports/' + reportId, report)

        yield put(ActionsCreators.updateReportSuccess(data.data))

    } catch (err) {
        yield put(ActionsCreators.updateReportFailure())
    }
}

export function* generateReport(action) {
    try {

        let report = action.report;

        const data = yield axios.post('https://infinite-basin-82984.herokuapp.com/reports/report/generate', report, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            }
        })

        const file = new Blob([data.data], { type: 'application/pdf' });
        
        const fileURL = URL.createObjectURL(file);
        
        yield put(ActionsCreators.generateReportSuccess(fileURL))

    } catch (err) {
        yield put(ActionsCreators.updateReportFailure())
    }
}