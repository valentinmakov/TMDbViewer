import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../Actions/actions'
import {Enums, Models} from '../Models/models'
import ViewDetails from '../Components/ViewDetails'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '../../App'

/**
 * Provides container for asset details screen
 */
const ContainerDetails: React.FC<IDetailsProps> = (
    {
        route,
        details,
        detailsPhase,
        detailsError,
        imageConfig,
        performCallGetDetailsRequest,
    }: IDetailsProps
): React.ReactElement<IDetailsProps> => {
    // Send initial requests on first mount
    useEffect(() => {
        performCallGetDetailsRequest(route.params.type, route.params.id)
    }, [])

    return (
        <ViewDetails
            route={route}
            details={details}
            detailsPhase={detailsPhase}
            detailsError={detailsError}
            imageConfig={imageConfig}
            performCallGetDetailsRequest={performCallGetDetailsRequest}
        />
    )
}

interface IOwnProps {
    route: RouteProp<RootStackParamList, 'Details'>,
}

interface IStateProps {
    details: Models.IDetails | null,
    detailsPhase: Enums.NetworkCallPhase,
    detailsError: Models.IError | null,
    imageConfig: Models.IImageConfig | null,
}

interface IDispatchProps {
    performCallGetDetailsRequest: (type: Enums.AssetType, id: number) => void,
}

export type IDetailsProps = IOwnProps & IStateProps & IDispatchProps

const mapStateToProps = (state: Models.IRootState): IStateProps => ({
    details: state.details,
    detailsPhase: state.detailsPhase,
    detailsError: state.detailsError,
    imageConfig: state.imageConfig,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performCallGetDetailsRequest: (type: Enums.AssetType, id: number): void => dispatch(actions.performCallGetDetailsRequest(type, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDetails)
