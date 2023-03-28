import {
	CCard,
	CRow,
	CCol,
	CCardImage,
	CCardBody,
	CCardTitle,
	CCardText,
	CButton,
} from "@coreui/react";

const Campground = ({ camp }) => {
	return (
		<div>
			<CCard className="mb-3" style={{ maxWidth: "90vw" }}>
				<CRow className="g-0">
					<CCol md={4}>
						<CCardImage src="https://res.cloudinary.com/dw6xfylwa/image/upload/v1653005047/YelpCamp/no-image_gauquf.jpg" />
					</CCol>

					<CCol md={8}>
						<CCardBody>
							<CCardTitle>{camp.title}</CCardTitle>
							<CCardText>{camp.description}</CCardText>
							<CCardText>
								<small className="text-medium-emphasis">
									Last updated 3 mins ago
								</small>
							</CCardText>
						</CCardBody>
						<a
							className="ms-3 btn btn-primary"
							color="primary"
							href={`/campgrounds/${camp._id}`}
						>
							View {camp.title}
						</a>
					</CCol>
				</CRow>
			</CCard>
		</div>
	);
};

export default Campground;
